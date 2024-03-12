import Post, { PostTabContainer } from '@/page/Post';
import Nav from '@/components/ui/Nav';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import type { NavigateFunction } from "react-router-dom";
import styled from 'styled-components';
import Aside from '@/components/ui/Aside';
import { CgProfile } from 'react-icons/cg';
import { ApiContainers } from '@/provider/ApiContainerProvider';
import { useCookies } from 'react-cookie';
import { deleteToken, getToken } from '@/utils/token';
import { ApiContainer } from '@/api/api';
import useApi from '@/hooks/useApi';
import { FaUserFriends } from "react-icons/fa";
import type { IWindow } from "@/types"

// const { kakao } = window as unknown as IWindow;

const LayoutDefault = styled.section`
  display: grid;
  grid-template-columns: minmax(320px, 375px) 4fr;
  grid-template-areas: 'aside main';
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 100%;
    grid-template-areas: 'aside';
  }
`;

const MainSection = styled.main`
  grid-area: main;
  height: 100%;
  @media screen and (max-width: 768px) {
  }
`;

const MobileLayout = () => {
	return <></>
}

const DesktopLayout = forwardRef((props, ref) => {
	const api = useApi();
	const fetchData = async () => {
		const response = await api('get', 'user');
	}

	return <>
		<Aside>
			<Nav>
				<Nav.Row background="rgba(24,132, 23, 0.2)" height="100px">
					<Nav.List float="space-between" width="100%">
						<Nav.Item
							to="/profile"
							className={({ isActive }) => (isActive ? 'actived' : 'pending')}
							width={'fit-content'}
						>
							<CgProfile />
							{/* <span>{profile.firstName + profile.lastName}</span> */}
						</Nav.Item>
						<Nav.Item
							to="/"
							onClick={(e) => {
								e.preventDefault();
								// removeCookie('refreshToken');
								deleteToken('accessToken');
								// navigator('/');
							}}
							width={"fit-content"}
						>
							Logout
						</Nav.Item>
					</Nav.List>
				</Nav.Row>
			</Nav>
			<Nav>
				<Nav.Row>
					<Post>
						<PostTabContainer>
							<Nav.Row height="auto">
								<Nav.List>
									<Nav.Item as="button" to="">
										DM
									</Nav.Item>
								</Nav.List>
								<Nav.List>
									<Nav.Item
										to="/explorer/recommend"
										className={({ isActive }) => (isActive ? 'actived' : 'pending')}
									>
										추천
									</Nav.Item>
								</Nav.List>
							</Nav.Row>
						</PostTabContainer>
					</Post>
				</Nav.Row>
				<Nav.Section id="nav-section">
					<Outlet />
				</Nav.Section>
				<div>
					<FaUserFriends fontSize={"32px"} />
				</div>
			</Nav>
		</Aside>
		<MainSection id="main">
			{/* <div ref={ref} style={{ width: "600px", height: "600px" }}> */}

			{/* </div> */}
		</MainSection>
	</>
});

const Layout = () => {
	const [post, setPost] = useState('');
	const [cookie, setCookie, removeCookie] = useCookies(["refreshToken"]);
	const navigator = useNavigate();
	const [profile, setProfile] = useState({
		image: "",
		lastName: "",
		firstName: "",
		gender: '',
	})

	const kakaoRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		if (kakaoRef) {
			const options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			};
			// const map = new kakao.maps.Map(kakaoRef.current, {
				// center: new kakao.maps.LatLng(
					// 33.450701, 126.570667
				// ),
				// level: 3,
			// });
			// console.log(map);
		}
	}, []);

	return (
		<LayoutDefault>
			<DesktopLayout ref={kakaoRef} />
		</LayoutDefault>
	);
};

export default Layout;
