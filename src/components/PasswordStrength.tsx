import React, { useState } from 'react';
import styled from 'styled-components';

const PasswordStrengthContainer = styled.div`
	.container {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: auto;
		border-radius: 5px;
		box-shadow: 0 0 15px rgba(0,0,0,0.2);
		padding: 34px;
		header {
			font-size: 24px;
		}
		.sub-header {
			color: #d9d9d9
		}
		form {
			width: 50%;
    		margin-top: 17px;
			.field {
				margin-top: 10px;
				position: relative;
				display: flex;
				flex-direction: column;
				label {
                    font-size: 12px;
                    margin-bottom: 5px;
				}
				input {
					height: 50px;
					outline: navajowhite;
					border-radius: 6px;
					padding-left: 10px;
					border: 2px solid #f1f1f1;
				}
				input:focus {
					border: 2px solid #7579cb;
				}
				.showBtn {
					position: absolute;
					right: 7px;
					top: 48px;
					font-size: 12px;
					transform: translateY(-50%);
					cursor: pointer;
					font-weight: 600;
				}
			}
			.strengthText {
				color: #d4d4d4;
				font-size: 12px;
				margin-top: 10px;
			}
			.indicator {
				height: 4px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 10px 0;
				span {
					width: 66px;
					height: 100%;
					background: lightgrey;
					border-radius: 5px;
					padding-right: 16px;
				}
			}
			.error {
				color: red;
				font-size: 12px;
			}
			.footer {
				display: flex;
				margin-top: 10px;
				flex-direction: row-reverse;			
				.getStart {
					background: #4448b7;
					cursor: pointer;
                    padding: 10px 17px;
                    font-weight: 800;
					color: #FFF;
					border-radius: 5px;
					outline: none;
					border: none;
					:disabled {
						background: #dadada;
						color: #bababa;
					}
				}
			}
		}
	}
`;

const M_STR_UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const M_STR_LOWER_CASE = "abcdefghijklmnopqrstuvwxyz";
const M_STR_NUMBER = "0123456789";
const M_STR_CHARACTERS = "!@#$%^&*?_~"

interface IPasswordStrength {
    setShowUserProfile: (val: boolean) => void;
}
const PasswordStrength: React.FC<IPasswordStrength> = ({ setShowUserProfile }) => {
    const [password, setPassword] = useState<string>('');
    const [passwordStatus, setPasswordStatus] = useState<string>('');
    const [passwordStatusColor, setPasswordStatusColor] = useState<string>('');
    const [isNotMatch, setIsNotMatch] = useState<boolean>(false);
    const [enableButton, setEnableButton] = useState<boolean>(false);
    const [showStrength, setShowStrength] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handlePassword = (val: string) => {
        runPassword(val);
    }
    const handleConfirmPassword = (val: string) => {
        setConfirmPassword(val);
        if (password !== val) {
            setIsNotMatch(true);
        } else {
            setIsNotMatch(false);
            setEnableButton(true);
        }
        setShowStrength(false);
    }

    const checkPassword = (strPassword: string) => {
        let nScore = 0;
        if (strPassword.length < 5) {
            nScore += 5;
        } else if (strPassword.length > 4 && strPassword.length < 8) {
            nScore += 10;
        } else if (strPassword.length > 7) {
            nScore += 25;
        }

        let nUpperCount = countContain(strPassword, M_STR_UPPER_CASE),
            nLowerCount = countContain(strPassword, M_STR_LOWER_CASE),
            nLowerUpperCount = nUpperCount + nLowerCount;

        if (nUpperCount === 0 && nLowerCount !== 0) {
            nScore += 10;
        } else if (nUpperCount !== 0 && nLowerCount !== 0) {
            nScore += 20;
        }

        let nNumberCount = countContain(strPassword, M_STR_NUMBER);
        if (nNumberCount === 1) {
            nScore += 10;
        }
        if (nNumberCount >= 3) {
            nScore += 20;
        }

        let nCharacterCount = countContain(strPassword, M_STR_CHARACTERS);
        if (nCharacterCount === 1) {
            nScore += 10;
        }
        if (nCharacterCount > 1) {
            nScore += 25;
        }

        if (nNumberCount !== 0 && nLowerUpperCount !== 0) {
            nScore += 2;
        }
        if (nNumberCount !== 0 && nLowerUpperCount !== 0 && nCharacterCount !== 0) {
            nScore += 3;
        }
        if (nNumberCount !== 0 && nUpperCount !== 0 && nLowerCount !== 0 && nCharacterCount !== 0) {
            nScore += 5;
        }
        return nScore;
    }

    const runPassword = (strPassword: any) => {
        // Check password
        const nScore = checkPassword(strPassword);

        if (nScore >= 80) {
            setPasswordStatus("Very Strong");
            setPasswordStatusColor("#008000");
        } else if (nScore >= 60) {
            setPasswordStatus("Strong");
            setPasswordStatusColor("#006000");
        } else if (nScore >= 40) {
            setPasswordStatus("Average");
            setPasswordStatusColor("#e3cb00");
        } else if (nScore >= 20) {
            setPasswordStatus("Weak");
            setPasswordStatusColor("#Fe3d1a");
        } else {
            setPasswordStatus("Very Weak");
            setPasswordStatusColor("#e71a1a");
        }
        setPassword(strPassword);
        setShowStrength(true);
        if (confirmPassword !== '' && strPassword !== confirmPassword) {
            setIsNotMatch(true);
        } else {
            setIsNotMatch(false);
        }
    }

    const countContain = (strPassword: any, strCheck: any) => {
        let nCount = 0;

        for (let i = 0; i < strPassword.length; i++) {
            if (strCheck.indexOf(strPassword.charAt(i)) > -1) {
                nCount++;
            }
        }
        return nCount;
    }

    const hadleSubmit = (e: any) => {
        e.preventDefault();
        setShowUserProfile(true);
    }
    return (
        <PasswordStrengthContainer>
            <div className='container'>
                <header>Welcome On Board!</header>
                <span className='sub-header'>Let's create a password to get you started</span>
                <form>
                    <div className='field'>
                        <label>Password</label>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Enter' onChange={(e) => { handlePassword(e.target.value) }} />
                        <span className='showBtn' onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'HIDE' : 'SHOW'}</span>
                    </div>
                    {showStrength && <>
                        <div className='strengthText'>Password Strength: <span style={{ color: passwordStatusColor }}>{passwordStatus}</span></div>
                        <div className='indicator'>
                            <span style={{ background: passwordStatus === "Very Weak" ? '#e71a1a' : passwordStatus === "Weak" ? '#Fe3d1a' : passwordStatus === "Average" ? '#e3cb00' : passwordStatus === "Strong" ? '#006000' : passwordStatus === "Very Strong" ? '#008000' : '#d3d3d3' }}></span>
                            <span style={{ background: passwordStatus === "Weak" ? '#Fe3d1a' : passwordStatus === "Average" ? '#e3cb00' : passwordStatus === "Strong" ? '#006000' : passwordStatus === "Very Strong" ? '#008000' : '#d3d3d3' }}></span>
                            <span style={{ background: passwordStatus === "Average" ? '#e3cb00' : passwordStatus === "Strong" ? '#006000' : passwordStatus === "Very Strong" ? '#008000' : '#d3d3d3' }}></span>
                            <span style={{ background: passwordStatus === "Strong" ? '#006000' : passwordStatus === "Very Strong" ? '#008000' : '#d3d3d3' }}></span>
                            <span style={{ background: passwordStatus === "Very Strong" ? '#008000' : '#d3d3d3' }}></span>
                        </div> </>}
                    <div className='field'>
                        <label>Confirm Password</label>
                        <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Enter' onChange={(e) => { handleConfirmPassword(e.target.value) }} />
                        <span className='showBtn' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? 'HIDE' : 'SHOW'}</span>
                    </div>
                    {isNotMatch && <div className='error'>
                        Password not match
					</div>}
                    <div className='footer'>
                        <button className='getStart' disabled={!enableButton} onClick={(e) => hadleSubmit(e)}>GET STARTED</button>
                    </div>
                </form>
            </div>
        </PasswordStrengthContainer>
    );
}

export default PasswordStrength;
