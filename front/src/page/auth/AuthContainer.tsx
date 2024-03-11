import Login from "@/page/auth/Login";
import Register from "@/page/auth/register/Register";
import { getToken } from "@/utils/token";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const AuthContainer = () => {
	const [login, setLogin] = useState(true);
	const navigator = useNavigate();

	useEffect(() => {
		if (getToken('accessToken')) {
			navigator('/explorer');
		}
	}, []);
	const onClick = () => {
		setLogin(!login);
	}
	return <Container>
		{
		login ? 
			<Login onClick={onClick}/> :
			<Register onClick={onClick}/>
		}
	</Container>
}

export default AuthContainer;