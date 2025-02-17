import {useCallback, useEffect, useRef, useState} from "react";
import {getMaxPrice} from "@/app/lib/api/prices";
import MultiRangeSlider from "multi-range-slider-react";

const RangeComponent = ({label,onRangeChange}) => {


    const [max,setMax] = useState(0);


    useEffect(()=> {
        (async () => {
            try {
                const result = await getMaxPrice();
                if (result?.data) {
                    setMax(result.data.maxPrice);
                }
            } catch (error) {
                console.log('Error fetching max price:', error);
            }

        })()
    },[])


    const handleInput = (e) => {
        onRangeChange(e.minValue,e.maxValue);
    }

    return (
        <>
            {

                max > 0 ? <>

                        {/*<input type="range" min={0} max={max} value="25" className="range" step="100"/>*/}
                        {/*<div className="flex w-full justify-between px-2 text-xs mb-10">*/}
                        {/*    <span>|</span>*/}
                        {/*    <span>|</span>*/}
                        {/*    <span>|</span>*/}
                        {/*    <span>|</span>*/}
                        {/*    <span>|</span>*/}
                        {/*</div>*/}

                        <MultiRangeSlider
                            type="range"
                            style={{border: 'none', boxShadow: 'none', marginBottom: '20px',marginTop: '25px'}}
                            className={'multi-range-slider'}
                            minValue={0}
                            maxValue={max}
                            max={max}
                            min={0}
                            tooltip={'on'}
                            onInput={e => {
                                handleInput(e)
                            }}
                            stepOnly={'100'}
                            subSteps={true}
                            label={true}
                            ruler={false}
                        />
                    </>
                    : null
            }
        </>
    )
}
export default RangeComponent;