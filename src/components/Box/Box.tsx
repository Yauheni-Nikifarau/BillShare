import React, {useContext, useState} from "react";
import {LibraryContext} from "../../context";

interface Option {
    value: string|number,
    text: string
}

interface Field {
    type: string,
    name: string,
    placeholder?: string
    options?: Array<Option>
}

interface BoxProps {
    title: string,
    buttonShouldBe: boolean,
    okClickHandler?: (properties: any) => void,
    fields?: Array<Field>
    children: any
}

const Box = (props: BoxProps) => {
    const [modalShouldOpen, setModalShouldOpen] = useState(false);
    const context = useContext(LibraryContext);

    const openModal = () => {
        setModalShouldOpen(true);
    }
    const closeModal = () => {
        setModalShouldOpen(false);
    }
    const callHandler = (event: any) => {
        let properties: any = {};
        const inputs = event.target.parentNode.querySelectorAll('input');
        for (let input of inputs) {
            properties[input.name] = input.value;
            input.value = '';
        }
        const selects = event.target.parentNode.querySelectorAll('select');
        for (let select of selects) {
            properties[select.name] = select.selectedOptions[0].value;
        }
        if (props.okClickHandler && properties) {
            props.okClickHandler(properties);
        }
        closeModal();
    }


    return (
        <div className={'box ' + props.title.toLowerCase()}>
            {props.fields ?
                <div className={'box_add-modal' + (modalShouldOpen ? ' open' : '')}>
                    {props.fields.map((field, index) => (
                        field.type === 'select' ?
                            <select name={field.name} key={index}>
                                {field.options ?
                                    field.options.map((option: Option, index) => (
                                        <option value={option.value} key={index}>{option.text}</option>
                                    )) : ''
                                }
                            </select> :
                            <input type={field.type} name={field.name} placeholder={field.placeholder} key={index} />
                    ))}
                    <button onClick={callHandler}>OK</button>
                </div>
                : ''
            }
            <div className='box-header'>
                <h2>{props.title}</h2>
                {props.buttonShouldBe ?
                    <button onClick={openModal}>+Add</button>
                    : ''
                }
            </div>
            {props.buttonShouldBe ?
                <div className={'shadow-bg' + (modalShouldOpen ? ' open' : '')} onClick={closeModal}></div>
                : ''
            }
            {props.children}
        </div>
    )
}

export default Box;