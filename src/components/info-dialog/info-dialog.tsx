import React from "react";
import { CloseIcon } from "../icons/close-icon";

export const InfoDialog: React.FC = () => {
	const onClick = () => {
		(document.getElementById("infoDialog") as HTMLDialogElement).close();
	};

	return (
		<dialog
			id="infoDialog"
			className="py-8 px-8 bg-gdk-white shadow-gdk-hard rounded-2xl w-11/12 sm:w-[410px] backdrop:backdrop-blur-xs relative"
		>
			<button className="absolute top-5 right-5" onClick={onClick}>
				<CloseIcon />
			</button>
			<div className="flex-col flex gap-4">
				<div className="flex flex-row gap-x-5 justify-start">
					<h1 className="text-5xl font-bold text-primaryBlue text-center my-0">
						Ideenwürfel
					</h1>
					<h1 className="absolute top-[30px] left-[34px] my-0 text-5xl font-bold text-primaryPink text-center">
						Ideenwürfel
					</h1>
				</div>
				<p className="text-primaryBlue">
					Drei Würfel, unendlich viele Ideen für die Stadt der Zukunft! Unsere
					Ideenwürfel sind ein interaktives Würfelspiel und laden dazu ein, sich
					von innovativen, aber nicht ganz ernst gemeinten Lösungsansätzen für
					ein lebenswerteres Berlin inspirieren zu lassen. {""} Schnapp' Dir
					zwei Mitspieler:innen oder würfele alles selbst. Den Rest erledigt die
					KI. Gezeigt werden alle bislang generierten Ideen als Postkarten aus
					der Zukunft.
				</p>
				<div className="flex gap-x-5 justify-start my-3">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://citylab-berlin.org"
						className="focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-focus"
					>
						<img
							src="https://logos.citylab-berlin.org/logo-citylab-color.svg"
							alt="Berlin"
							className="w-[130px]"
						/>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href="technologiestiftung-berlin.de/"
						className="focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-focus"
					>
						<img
							src="https://logos.citylab-berlin.org/logo-tsb-outline.svg"
							alt="Berlin"
							className="w-[92px]"
						/>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.berlin.de/rbmskzl/"
						className="focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-focus"
					>
						<img
							src="https://logos.citylab-berlin.org/logo-senatskanzlei-buergermeister-horizontal.svg"
							alt="Berlin"
							className="w-[150px]"
						/>
					</a>
				</div>
				<div className="flex justify-start gap-x-6 gap-y-3 flex-wrap text-primaryBlue">
					<a
						target="_blank"
						rel="noreferrer"
						className=" hover:text-hoverBlue underline focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-focus"
						href="https://citylab-berlin.org/de/data-privacy/"
					>
						Datenschutz
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						className=" hover:text-hoverBlue underline focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-focus"
						href="https://citylab-berlin.org/de/imprint/"
					>
						Impressum
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						className=" hover:text-hoverBlue underline focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-focus"
						href="https://github.com/technologiestiftung/idea-machine-frontend"
					>
						Quellcode
					</a>
				</div>
			</div>
		</dialog>
	);
};
