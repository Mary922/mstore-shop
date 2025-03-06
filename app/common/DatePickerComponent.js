import { useEffect, useId, useRef, useState } from "react";
import { ru } from "react-day-picker/locale";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";

export function DatePickerComponent() {
    const dialogRef = useRef(null);
    const dialogId = useId();
    const headerId = useId();

    // Hold the month in state to control the calendar when the input changes
    const [month, setMonth] = useState(new Date());

    // Hold the selected date in state
    const [selectedDate, setSelectedDate] = useState(undefined);

    // Hold the input value in state
    const [inputValue, setInputValue] = useState("");

    console.log('inputValue',inputValue);

    // Hold the dialog visibility in state
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Function to toggle the dialog visibility
    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    // Hook to handle the body scroll behavior and focus trapping.
    useEffect(() => {
        const handleBodyScroll = (isOpen) => {
            document.body.style.overflow = isOpen ? "hidden" : "";
        };
        if (!dialogRef.current) return;
        if (isDialogOpen) {
            handleBodyScroll(true);
            dialogRef.current.showModal();
        } else {
            handleBodyScroll(false);
            dialogRef.current.close();
        }
        return () => {
            handleBodyScroll(false);
        };
    }, [isDialogOpen]);

    const handleDayPickerSelect = (date) => {
        if (!date) {
            setInputValue("");
            setSelectedDate(undefined);
        } else {
            setSelectedDate(date);
            setInputValue(format(date, "MM/dd/yyyy"));
        }
        dialogRef.current?.close();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // keep the input value in sync

        const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());

        if (isValid(parsedDate)) {
            setSelectedDate(parsedDate);
            setMonth(parsedDate);
        } else {
            setSelectedDate(undefined);
        }
    };

    return (
        <div>
            <label htmlFor="date-input">
                <strong>Выберите дату: </strong>
            </label>
            <input
                style={{ fontSize: "inherit" }}
                id="date-input"
                type="text"
                value={inputValue}
                placeholder={"MM/dd/yyyy"}
                onChange={handleInputChange}
            />{" "}
            <button
                style={{ fontSize: "inherit" }}
                onClick={toggleDialog}
                aria-controls="dialog"
                aria-haspopup="dialog"
                aria-expanded={isDialogOpen}
                aria-label="Open calendar to choose booking date"
            >
                📆
            </button>
            {/*<p aria-live="assertive" aria-atomic="true">*/}
            {/*    {selectedDate !== undefined*/}
            {/*        ? selectedDate.toDateString()*/}
            {/*        : "Выберите дату рождения"}*/}
            {/*</p>*/}
            <dialog
                role="dialog"
                ref={dialogRef}
                id={dialogId}
                aria-modal
                aria-labelledby={headerId}
                onClose={() => setIsDialogOpen(false)}
            >
                <div className='flex justify-between items-center'>
                    <div>Выша дата рождения:</div>
                    {/* Кнопка закрытия */}
                    <button
                        onClick={()=>setIsDialogOpen(false)}
                        className='btn btn-ghost text-lg'
                        // style={{
                        //     position: "absolute",
                        //     top: "10px",
                        //     right: "10px",
                        //     background: "none",
                        //     border: "none",
                        //     fontSize: "1.5em",
                        //     cursor: "pointer",
                        // }}
                        aria-label="Close calendar"
                    >
                        X
                    </button>
                </div>

                        {/*<button className='btn btn-ghost cursor-pointer' onClick={()=> setIsDialogOpen(null)}>X</button>*/}
                        <DayPicker
                            hideNavigation
                            captionLayout={'dropdown'}
                            locale={ru}
                            month={month}
                            onMonthChange={setMonth}
                            autoFocus
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDayPickerSelect}
                            // footer={
                            //     selectedDate !== undefined &&
                            //     `Selected: ${selectedDate.toDateString()}`
                            // }
                        />
            </dialog>
        </div>
);
}