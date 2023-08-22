import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
	faGithub,
	faLinkedin,
	faMedium,
	faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
	{
		icon: faEnvelope,
		url: "mailto: hello@example.com",
	},
	{
		icon: faGithub,
		url: "https://github.com",
	},
	{
		icon: faLinkedin,
		url: "https://www.linkedin.com",
	},
	{
		icon: faMedium,
		url: "https://medium.com",
	},
	{
		icon: faStackOverflow,
		url: "https://stackoverflow.com",
	},
];

const Header = () => {
	/*
	const [direction, setDirection] = useState("");
	const scroll = useScrollListener();

	useEffect(
		() =>
			scroll.y > 150 && scroll.y - scroll.lastY > 0
				? setDirection("down")
				: setDirection("up"),
		[scroll.y, scroll.lastY]
	);

	const navbar = {
		active: {
			visibility: "visible",
			transition: "all 0.5s",
		},
		hidden: {
			visibility: "hidden",
			transition: "all 0.5s",
			transform: "translateY(-200%)",
		},
	};
*/
	const headerRef = useRef(null);
	useEffect(() => {
		let initialPosition = window.scrollY;

		const scrollHandler = () => {
			const currentPosition = window.scrollY;
			const getHeaderEl = headerRef.current;

			if (!getHeaderEl) {
				return;
			}

			if (initialPosition > currentPosition) {
				getHeaderEl.style.transform = "translateY(0)";
			} else {
				getHeaderEl.style.transform = "translateY(-200px)";
			}

			initialPosition = currentPosition;
		};

		window.addEventListener("scroll", scrollHandler);

		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, []);

	const handleClick = (anchor) => () => {
		const id = `${anchor}-section`;
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<Box
			position="fixed"
			top={0}
			left={0}
			right={0}
			translateY={0}
			transitionProperty="transform"
			transitionDuration=".3s"
			transitionTimingFunction="ease-in-out"
			backgroundColor="#18181b"
			ref={headerRef}
			zIndex={50}
		>
			<Box color="white" maxWidth="1280px" margin="0 auto">
				<HStack
					px={16}
					py={4}
					justifyContent="space-between"
					alignItems="center"
				>
					<nav>
						<HStack spacing={8}>
							{socials &&
								socials.map((social) => (
									<a href={social.url} key={social.url}>
										<FontAwesomeIcon icon={social.icon} size="2x" />
									</a>
								))}
						</HStack>
						{/* Add social media links based on the `socials` data */}
					</nav>
					<nav>
						<HStack spacing={8}>
							<a href="/#contactme" onClick={handleClick("contactme")}>
								Contact Me
							</a>
							<a href="/#projects" onClick={handleClick("projects")}>
								Projects
							</a>
							{/* Add links to Projects and Contact me section */}
						</HStack>
					</nav>
				</HStack>
			</Box>
		</Box>
	);
};
export default Header;
