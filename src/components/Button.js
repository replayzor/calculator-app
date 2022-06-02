import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = (btn) => {
	const className = {
		"=": "equals",
		"*": "opt",
		"-": "opt",
		"+": "opt",
		"/": "opt",
	};
	return className[btn];
};

const Button = ({ value }) => {
	const { calc, setCalc } = useContext(CalcContext);

	// User click comma
	const commaClick = () => {
		setCalc({
			...calc,
			num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
		});
	};

	// User click C
	const resetClick = () => {
		setCalc({ sign: "", num: 0, res: 0 });
	};

	// User click number
	const btnClickHandler = () => {
		const numberString = value.toString();

		let numberValue;
		if (numberString === "0" && calc.num === 0) {
			numberValue = "0";
		} else {
			numberValue = Number(calc.num + numberString);
		}

		setCalc({
			...calc,
			num: numberValue,
		});
	};
	// User click operation
	const signClick = () => {
		setCalc({
			sign: value,
			res: !calc.res && calc.num ? calc.num : calc.res,
			num: 0,
		});
	};

	// User click equals
	const equalsClick = () => {
		if (calc.res && calc.num) {
			const math = (a, b, sign) => {
				const result = {
					"+": (a, b) => a + b,
					"-": (a, b) => a - b,
					"*": (a, b) => a * b,
					"/": (a, b) => a / b,
				};
				return result[sign](a, b);
			};

			setCalc({
				res: math(calc.res, calc.num, calc.sign),
				sign: "",
				num: 0,
			});
		}
	};
	// User click percent
	const percentClick = () => {
		setCalc({
			num: calc.num / 100,
			res: calc.res / 100,
			sign: "",
		});
	};

	// User click invert button
	const invertClick = () => {
		setCalc({
			num: calc.num ? calc.num * -1 : 0,
			res: calc.res ? calc.res * -1 : 0,
			sign: "",
		});
	};

	const btnHandler = () => {
		const results = {
			".": commaClick,
			AC: resetClick,
			"/": signClick,
			"*": signClick,
			"-": signClick,
			"+": signClick,
			"=": equalsClick,
			"%": percentClick,
			"+-": invertClick,
		};
		if (results[value]) {
			return results[value]();
		} else {
			btnClickHandler();
		}
	};
	return (
		<button onClick={btnHandler} className={`${getStyleName(value)} button`}>
			{value}
		</button>
	);
};

export default Button;
