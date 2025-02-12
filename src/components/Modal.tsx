"use client";

import React from "react";



interface ModelFormProps {
	onClose: () => void;
	children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModelFormProps) {
	

	return (
		<div>
			<div
				className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
				onClick={onClose}
			>
				<div
					className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative"
					onClick={(e) => e.stopPropagation()}
				>
					{/* <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"> */}
					{children}
					{/* </div> */}
				</div>
			</div>
		</div>
	);
}
