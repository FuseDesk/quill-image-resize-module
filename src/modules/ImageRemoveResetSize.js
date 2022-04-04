import { BaseModule } from './BaseModule';

class ImageRemoveResetSize extends BaseModule {
	constructor(resizer) {
		super(resizer);
		this.checkImage = resizer.checkImage;
		this.quill = resizer.quill
		this.img = resizer.img
		this.repositionElements = resizer.repositionElements
	}

	onCreate = () => {
		try {
			this.display = document.createElement('div');
			Object.assign(this.display.style, this.options.imageRemoveResetSizeStyles || {});
			// this.display.style.bottom = '-40px';
			// this.display.style.left = '10px';
			this.overlay.appendChild(this.display);
			this._defineButtons();
			this._createButtons();
		} catch (err) {
			console.error(err)
		}
	}

	onUpdate = () => {}

	onDestroy = () => {
		[...this.display.children || []].forEach((child, i) => child.removeEventListener('click', this.buttonsConfig[i].handler));
	}

	_defineButtons = () => {
		this.buttonsConfig = [
			{
				text: 'Original Size',
				handler: () => {
					this.img.width = this.img.naturalWidth;
					requestAnimationFrame(this.repositionElements)
				},
				styles: {
					padding: '3px 12px 3px 0',
					marginRight: '8px',
					borderRight: '1px solid #5506BE',
					cursor: 'pointer',
				},
			},
			{
				text: 'Remove',
				handler: () => {
					this.checkImage({ keyCode: 8 });
				},
				styles: {
					padding: '3px 0px 3px 12px',
					cursor: 'pointer',
				},
			},
		]
	}

	_createButtons = () => {
		try {
			this.buttonsConfig.forEach((config) => {
				const button = document.createElement('span');
				Object.assign(button.style, config.styles || {});
				button.textContent = config.text
				button.addEventListener('click', config.handler);
				this.display.appendChild(button);
			})
		} catch (err) {
			debugger
			console.log(err)
		}
	}

	resetTOOriginalSize = () => {}
}

export {ImageRemoveResetSize}
