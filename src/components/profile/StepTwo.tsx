import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';

const StepTwoContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .profile-container {
        width: 40%;
        display: flex;
        flex-direction: column;
        .profile-header {
            display: flex;
            flex-direction: column;
            .step {
                color: #c3bfbf;
                font-size: 10px;
            }
            .header {
                font-size: 20px;
                color: #565656;
                margin-top: 10px;
            }
        }
        .css-yk16xz-control, .css-1pahdxg-control {
            height: 120px;
        }
        .css-1rhbuit-multiValue {
            border-radius: 15px;
            padding: 3px;
        }
        .css-1hb7zxy-IndicatorsContainer {
            display: none;
        }
        . css-yk16xz-control {
            overflow: scroll;
        }
    }
    .selectBox {
        padding-top: 16px;
        .title {
            font-size: 13px;
            color: #959595;
            margin-bottom: 5px;
        }
    }
    .suggestion {
        margin-top: 10px;
        .title {
            font-size: 13px;
            color: #959595;
            margin-bottom: 5px;
        } 
        .suggestion-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-top:20px;
            .chip {
                padding: 6px;
                background: #f2f3fa;
                border-radius: 3px;
                margin: 6px 14px;
                cursor: pointer;
            }
        }
    }
    .footer {
        width: 95%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 18px;
        box-shadow: 0 0 15px rgba(0,0,0,0.2);
        position: absolute;
        bottom: 0;
        padding: 40px;
        background: #FFF;
        .skip {
            background: transparent;
            border: 0;
            cursor: pointer;
            color: #6469c5;
            font-size: 16px;
            font-weight: 600;
            outline: none;
        }
        .back {
            margin-right: 15px;
        }
        .submit {
            background: #4448b7;
            cursor: pointer;
            padding: 10px 17px;
            font-weight: 800;
            color: #FFF;
            border-radius: 5px;
            outline: none;
            border: none;
        }
    }
`;
const options = [
    { value: "HTML5", label: "HTML5" },
    { value: "CSS3", label: "CSS3" },
    { value: "Javascript", label: "Javascript" },
    { value: "Typescript", label: "Typescript" },
    { value: "React Js", label: "React Js" },
    { value: "Data Entry", label: "Data Entry" },
    { value: "MS Office", label: "MS Office" },
    { value: "Front End Developement", label: "Front End Developement" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "CAD", label: "CAD" },
    { value: "Referral Marketing", label: "Referral Marketing" },
];
const suggestions = [
    { value: "Data Entry", label: "Data Entry" },
    { value: "MS Office", label: "MS Office" },
    { value: "Front End Developement", label: "Front End Developement" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "CAD", label: "CAD" },
    { value: "Referral Marketing", label: "Referral Marketing" },
];

interface IStepTwo {
    setSkillSet: any;
    setIsStepOne: (val: boolean) => void;
    skillset: any;
}
const StepTwo: React.FC<IStepTwo> = ({ setSkillSet, setIsStepOne, skillset }) => {
    const [keySkills, setKeySkills] = useState<any>(skillset);
    const handleChange = (newValue: any) => {
        setKeySkills(newValue);
    };
    const handleSuggestion = (val: any) => {
        setKeySkills([...keySkills, val])
    }
    const handleSubmit = () => {
        setSkillSet(keySkills);
    }
    return (
        <StepTwoContainer>
            <div className='profile-container'>
                <div className='profile-header'>
                    <span className='step'>STEP 2 OF 4</span>
                    <span className='header'>Share your skillsets</span>
                </div>
                <div className='selectBox'>
                    <span className='title'>Add your skills</span>
                    <CreatableSelect
                        value={keySkills}
                        isMulti
                        onChange={handleChange}
                        options={options}
                    />
                </div>
                <div className='suggestion'>
                    <span className='title'>Few Suggestions</span>
                    <div className='suggestion-list'>
                        {suggestions && suggestions.map((val, index) => {
                            return <div className='chip' key={index} onClick={() => { handleSuggestion(val) }}>{val.label}</div>
                        })}
                    </div>
                </div>
            </div>
            <div className='footer'>
                <button className='skip'>SKIP FOR LATER</button>
                <div>
                    <button className='back skip' onClick={() => setIsStepOne(true)}>BACK</button>
                    <button className='submit' onClick={() => { handleSubmit() }}>SAVE AND CONTINUE</button>
                </div>
            </div>

        </StepTwoContainer>
    )
}

export default StepTwo;