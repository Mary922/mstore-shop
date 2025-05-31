import {useEffect, useId, useRef, useState} from "react";
import {ru} from "react-day-picker/locale";
import {format, isValid, parse} from "date-fns";
import {DayPicker} from "react-day-picker";

export function DatePickerComponent({formik}) {
    const dialogRef = useRef(null);
    const dialogId = useId();
    const headerId = useId();

    const [month, setMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [inputValue, setInputValue] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

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
            setInputValue(format(date, "yyyy-MM-dd"));
            formik.setFieldValue('birthday', format(date, "yyyy-MM-dd"));
            formik.setTouched({birthday: true});
        }
        dialogRef.current?.close();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        const parsedDate = parse(e.target.value, "yyyy-MM-dd", new Date());

        if (isValid(parsedDate)) {
            setSelectedDate(parsedDate);
            setMonth(parsedDate);
            formik.setFieldValue('birthday', format(parsedDate, "yyyy-MM-dd"));
            formik.setTouched({birthday: true});
        } else {
            setSelectedDate(undefined);
            formik.setFieldValue('birthday', '');
        }
    };

    return (
        <div>
            <label htmlFor="date-input">
                <strong>Выберите дату: </strong>
            </label>
            <input
                style={{fontSize: "inherit"}}
                id="date-input"
                type="text"
                value={inputValue}
                placeholder={"yyyy-MM-dd"}
                onChange={handleInputChange}
            />{" "}
            <button
                style={{fontSize: "inherit"}}
                onClick={toggleDialog}
                aria-controls="dialog"
                aria-haspopup="dialog"
                aria-expanded={isDialogOpen}
                aria-label="Open calendar to choose booking date"
            >
                📆
            </button>
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
                    <button
                        onClick={() => setIsDialogOpen(false)}
                        className='btn btn-ghost text-lg'
                        aria-label="Close calendar"
                    >
                        X
                    </button>
                </div>
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
                />
            </dialog>
        </div>
    );
}