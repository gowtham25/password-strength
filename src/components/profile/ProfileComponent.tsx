import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

interface IProfileDetails {
    name: string;
    introductionTeam: boolean;
    intro: string;
}

interface IProfileComponent {
    profileDetails: IProfileDetails
    setProfileDetails: any;
    setSkillSet: any;
    skillset: any;
}
const ProfileComponent: React.FC<IProfileComponent> = ({ profileDetails, setProfileDetails, setSkillSet, skillset }) => {
    const [isStepOne, setIsStepOne] = useState<boolean>(true);
    return (
        <>
            {isStepOne && <StepOne profileDetails={profileDetails} setProfileDetails={setProfileDetails} setIsStepOne={setIsStepOne} />}
            {!isStepOne && <StepTwo setSkillSet={setSkillSet} setIsStepOne={setIsStepOne} skillset={skillset} />}
        </>
    )
}

export default ProfileComponent;