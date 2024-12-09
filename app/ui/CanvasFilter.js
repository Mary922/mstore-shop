import {changeCanvas, changeFilterCanvas, getFilteredProducts} from "../slices/appCommonSlice";
import {Offcanvas} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import AccordionComponent from "./common/AccordionComponent";
import RangeComponent from "./common/RangeComponent";
import {applyFilterParams, getFilterParams} from "../api/filter";
import {getMaxPrice} from "../api/prices";
import {useNavigate} from "react-router-dom";


const CanvasFilter = ({show, close, placement, category}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filterItems, setFilterItems] = useState([]);
    const [names, setNames] = useState([]);

    const [checkedOptionsSizes, setCheckedOptionsSizes] = useState([]);
    const [checkedOptionsColors, setCheckedOptionsColors] = useState([]);
    const [checkedOptionsSeasons, setCheckedOptionsSeasons] = useState([]);
    const [checkedOptionsBrands, setCheckedOptionsBrands] = useState([]);
    const [checkedOptionsCountries, setCheckedOptionsCountries] = useState([]);

    const [minRangeValue, setMinRangeValue] = useState(0);
    const [maxRangeValue, setMaxRangeValue] = useState(0);

    const handleRangeChange = useCallback((newMinRangeValue, newMaxRangeValue) => {
        setMinRangeValue(newMinRangeValue);
        setMaxRangeValue(newMaxRangeValue);
    }, []);

    useEffect(() => {
        (async () => {
            const filterRes = await getFilterParams();
            if (filterRes?.data) {
                setFilterItems(filterRes.data);
            }
            const resultMax = await getMaxPrice();
            if (resultMax?.data) {
                setMaxRangeValue(resultMax.data.maxPrice);
            }
        })()
    }, [checkedOptionsSeasons])

    const checkChangedFilter = () => {
        if (checkedOptionsBrands.length > 0 || checkedOptionsColors.length > 0 || checkedOptionsCountries.length > 0 || checkedOptionsSeasons.length > 0 || checkedOptionsSizes.length > 0) {
            console.log('changes smth')
        }
    }

    const handleApplyFilter = async () => {
         checkChangedFilter();
        const result = await applyFilterParams(
            category,
            checkedOptionsSizes,
            checkedOptionsColors,
            checkedOptionsSeasons,
            checkedOptionsBrands,
            checkedOptionsCountries,
            minRangeValue,
            maxRangeValue
        )

        let searchParams = new URLSearchParams({
            category,
            sizes: JSON.stringify(checkedOptionsSizes),
            colors: JSON.stringify(checkedOptionsColors),
            seasons: JSON.stringify(checkedOptionsSeasons),
            brands: JSON.stringify(checkedOptionsBrands),
            countries: JSON.stringify(checkedOptionsCountries),
            minPrice: minRangeValue,
            maxPrice: maxRangeValue
        });

        let ids = [];
        if (result?.data.length > 0) {
            console.log('result',result.data);
            await dispatch(changeFilterCanvas(false));

            for (let i = 0; i < result?.data?.length; i++) {
                ids.push(result?.data[i].product_id);
            }
            await dispatch(getFilteredProducts(ids));
            navigate(`/search?${searchParams.toString()}`);
        }
    }

    return (
        <>
            <Offcanvas show={show} onHide={() => dispatch(changeFilterCanvas(false))} placement={placement}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Вход</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/*{*/}
                    {/*    category ? null : <AccordionComponent name={'Категории'}/>*/}
                    {/*}*/}
                    {
                        filterItems.sizes && filterItems.sizes.length > 0 ? <AccordionComponent name={'Размер'}
                                                                                                checkedOptions={checkedOptionsSizes}
                                                                                                setCheckedOptions={setCheckedOptionsSizes}
                                                                                                options={filterItems.sizes.map(item => ({
                                                                                                    value: item.size_id,
                                                                                                    label: item.size_name
                                                                                                }))}
                        /> : null
                    }
                    {
                        filterItems.colors && filterItems.colors.length > 0 ? <AccordionComponent name={'Цвет'}
                                                                                                  options={filterItems.colors.map(item => ({
                                                                                                      value: item.color_id,
                                                                                                      label: item.color_name
                                                                                                  }))}
                                                                                                  checkedOptions={checkedOptionsColors}
                                                                                                  setCheckedOptions={setCheckedOptionsColors}
                        /> : null
                    }
                    {
                        filterItems.seasons && filterItems.seasons.length > 0 ? <AccordionComponent name={'Сезон'}
                                                                                                    options={filterItems.seasons.map(item => ({
                                                                                                        value: item.season_id,
                                                                                                        label: item.season_name
                                                                                                    }))}
                                                                                                    checkedOptions={checkedOptionsSeasons}
                                                                                                    setCheckedOptions={setCheckedOptionsSeasons}
                        /> : null
                    }
                    {
                        filterItems.brands && filterItems.brands.length ? <AccordionComponent name={'Бренд'}
                                                                                              options={filterItems.brands.map(item => ({
                                                                                                  value: item.brand_id,
                                                                                                  label: item.brand_name
                                                                                              }))}
                                                                                              checkedOptions={checkedOptionsBrands}
                                                                                              setCheckedOptions={setCheckedOptionsBrands}
                        /> : null
                    }
                    {
                        filterItems.countries && filterItems.countries.length ? <AccordionComponent name={'Страна'}
                                                                                                    options={filterItems.countries.map(item => ({
                                                                                                        value: item.country_id,
                                                                                                        label: item.country_name
                                                                                                    }))}
                                                                                                    checkedOptions={checkedOptionsCountries}
                                                                                                    setCheckedOptions={setCheckedOptionsCountries}
                        /> : null
                    }

                    <RangeComponent label={'Цена'} minRangeValue={minRangeValue} maxRangeValue={maxRangeValue} onRangeChange={handleRangeChange} />
                    <Button variant="success" onClick={handleApplyFilter}>Применить</Button>



                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
export default CanvasFilter;
