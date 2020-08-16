import React, { useState } from 'react';
import './App.css';
import PasswordStrength from './components/PasswordStrength';
import ProfileComponent from './components/profile/ProfileComponent';

const PasswordComponent = () => {
	const [showUserProfile, setShowUserProfile] = useState(false);
	const [profileDetails, setProfileDetails] = useState({
		name: 'Tony Redlang',
		introductionTeam: false,
		intro: ''
	});
	const [skillset, setSkillSet] = useState<any>([]);
	return (
		<>
			{!showUserProfile && <PasswordStrength setShowUserProfile={setShowUserProfile} />}
			{showUserProfile && <ProfileComponent profileDetails={profileDetails} setProfileDetails={setProfileDetails} setSkillSet={setSkillSet} skillset={skillset} />}
		</>
	);
}

export default PasswordComponent;
