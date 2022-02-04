import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

class ColourPickerButton extends React.Component {
	state = {
		displayColorPicker: false,
		color: this.props.value,
	};

	defaultColours = ["#FF0000", "#0000FF", "#FF00FF", "#800080", "#008000", "#00FF00", "#C0C0C0", "#800000", "#000080", "#808000", "#808080", "#008080", "#FFFF00", "#00FFFF", "#000000", "#FF642E", "#CDDC39", "#607D8B", "#E91E63", "#00D084"];

	handleClick = () => {
		if (this.props.disabled) {
			return;
		}
		this.setState({ displayColorPicker: !this.state.displayColorPicker });
	};

	handleClose = () => {
		this.setState({ displayColorPicker: false });
	};

	handleChange = (color) => {
		this.setState({ color: color.hex });
		if (this.props.onChange) {
			this.props.onChange(color.hex);
		}
	};

	render() {
		const styles = reactCSS({
			"default": {
				color: {
					width: "100%",
					height: "24px",
					borderRadius: "0",
					background: `${this.state.color}`,
				},
				swatch: {
					width: "100%",
					padding: "5px",
					background: "#fff",
					borderColor: "#D8E2EF",
					borderRadius: "4px",
					boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
					display: "inline-block",
					cursor: "pointer",
				},
				popover: {
					position: "absolute",
					zIndex: "2",
				},
				cover: {
					position: "fixed",
					top: "0px",
					right: "0px",
					bottom: "0px",
					left: "0px",
				},
			},
		});

		return (
			<div>
				<div style={styles.swatch} onClick={this.handleClick}>
					<div style={styles.color} />
				</div>
				{this.state.displayColorPicker ? (
					<div style={styles.popover}>
						<div style={styles.cover} onClick={this.handleClose} />
						<SketchPicker color={this.state.color} onChange={this.handleChange} presetColors={this.defaultColours} width={250} disableAlpha />
					</div>
				) : null}
			</div>
		);
	}
}

export default ColourPickerButton;
