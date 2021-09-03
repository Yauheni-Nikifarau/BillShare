import React from "react";

interface Field {
    type: string,
    name: string,
    placeholder: string
}

interface SampleProps {
    title: string,
    buttonShouldBe: boolean,
    clickHandler?: () => void,
    fields: Array<Field>
}

class Box extends React.Component<SampleProps> {
    constructor(props: SampleProps) {
        super(props);
    }
    render() {
        return(
            <div className={'box ' + this.props.title.toLowerCase()}>
                <div className='box_add-modal'>
                    {this.props.fields.map((field, index) => (
                        <input type={field.type} name={field.name} placeholder={field.placeholder} />
                    ))}
                </div>
                <div className='box-header'>
                    <h2>{this.props.title}</h2>
                    {this.props.buttonShouldBe ?
                        <button onClick={this.props.clickHandler}>+Add</button> : null
                    }
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default Box;