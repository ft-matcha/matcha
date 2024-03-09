import { Outlet } from "react-router-dom";

const Main = ({children} : {children?: React.ReactNode}) => {
	console.log('hi')
	return <>
		{children}
		<Outlet/>
	</>
}

export default Main;