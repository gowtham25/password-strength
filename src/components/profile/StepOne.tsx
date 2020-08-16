import React, { useState } from 'react';
import styled from 'styled-components';

const StepOneContainer = styled.div`
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
        .name-details-container {
            display: flex;
            flex-direction: row;
            margin-top: 20px;
            .avatar {
                background: #00c6fe;
                padding: 28px;
                border-radius: 45px;
                font-size: 29px;
                color: #FFF;
                font-weight: 700;
            }
            .name-container {
                display: flex;
                align-items: flex-end;
                flex-direction: column;
                width: 100%;
                justify-content: center;
                div{
                    display: flex;
                    flex-direction: column;
                    width: 92%;
                    span {
                        color: #c3bfbf;
                        font-size: 13px;
                    }
                    input {
                        // width: 60%;
                        height: 36px;
                        outline: none;
                        font-size: 16px;
                        padding-left: 10px;
                    }
                }
            }
        }
        .message-container {
            margin-top: 15px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .left-container {
                display: flex;
                flex-direction: column;
                width: 49%;
                span {
                    color: #c3bfbf;
                    font-size: 13px;
                    margin-bottom: 5px;
                }            
                textarea {
                    border: 1px solid #e4e4e4;
                    border-radius: 7px;
                    height: 275px;
                    resize: none;
                    outline: none;
                    padding: 10px;
                }
                .button-container {
                    display: flex;
                    flex-direction: row-reverse;
                }
            }
            .right-container {
                display: flex;
                flex-direction: column;
                width: 49%;
                span {
                    color: #c3bfbf;
                    font-size: 13px;
                    margin-bottom: 5px;
                }   
                .template {
                    border: 1px solid #e4e4e4;
                    border-radius: 7px;
                    height: 275px;
                    resize: none;
                    outline: none;
                    padding: 10px;
                    background: #f2f3fa;
                    color: #adaeb1;
                    font-size: 15px;
                    font-weight: 500;
                    text-align: justify;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .button-container {
                        display: flex;
                        flex-direction: row-reverse;
                        button {
                            border: none;
                            color: #afb4e3;
                            cursor: pointer;
                            outline: none;
                            background: transparent;
                            font-size: 14px;
                            font-weight: 700;                        
                        }
                    }
                }         
            }
        }
        .checkbox-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            input {
                width: 22px;
                height: 18px;
            }
            label {
                font-size: 13px;
                color: #959595;
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

interface IProfileDetails {
    name: string;
    introductionTeam: boolean;
    intro: string;
}
interface IStepOne {
    profileDetails: IProfileDetails
    setProfileDetails: any;
    setIsStepOne: (val: boolean) => void;
}
const templateStr = "I'm a growth marketer with a decade plus experience working with startups and driving upto 5X growth YoY.Love working in a fast paced environment and belive that good ideas can come from anywhere.Human of my dog - Goofy, and can't sing to save my live. Super excited to be part of the team and looking to drive curve hockey growth with the marketing team. Favourite Quote: In God I trust, everyone else must bring data.";

const StepOne: React.FC<IStepOne> = ({ profileDetails, setProfileDetails, setIsStepOne }) => {
    const [allDetails, setAllDetails] = useState(profileDetails);

    const updateProfile = (key: string, value: any) => {
        setAllDetails({ ...allDetails, [key]: value })
    }
    const handleSaveAndContinue = () => {
        setProfileDetails(allDetails);
        setIsStepOne(false);
    }
    const { intro, name, introductionTeam } = allDetails || {};
    return (
        <StepOneContainer>
            <div className='profile-container'>
                <div className='profile-header'>
                    <span className='step'>STEP 1 OF 4</span>
                    <span className='header'>Introduce Yourself</span>
                </div>
                <div className='name-details-container'>
                    <div className='avatar'>TR</div>
                    <div className='name-container'>
                        <div>
                            <span>Full Name</span>
                            <input value={name} disabled />
                            <span>Your name is preset by your HR</span>
                        </div>
                    </div>
                </div>
                <div className='message-container'>
                    <div className='left-container'>
                        <span>Describe yourself in few words</span>
                        <textarea placeholder='Hi..' value={intro} onChange={(e) => { updateProfile('intro', e.target.value) }}></textarea>
                        <div className='button-container'>
                            <span>{`${intro.length <= 300 ? intro.length : 300} / 300`}</span>
                        </div>
                    </div>
                    <div className='right-container'>
                        <span>Use from these suggestions</span>
                        <div className='template'>
                            <p>{templateStr}</p>
                            <div className='button-container'>
                                <button onClick={() => updateProfile('intro', templateStr)}> Use this template</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='checkbox-container'>
                    <input type='checkbox' id='intro' checked={introductionTeam} onChange={(e: any) => { updateProfile('introductionTeam', e.target.checked) }} /> <label htmlFor='intro'>Use this description as an introduction to the team</label>
                </div>
            </div>
            <div className='footer'>
                <button className='skip' onClick={() => { setIsStepOne(false) }}>SKIP</button>
                <button className='submit' onClick={() => { handleSaveAndContinue() }}>SAVE AND CONTINUE</button>
            </div>
        </StepOneContainer >
    )
}

export default StepOne;