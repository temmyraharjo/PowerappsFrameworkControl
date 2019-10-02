import {IInputs, IOutputs} from "./generated/ManifestTypes";

class ImageLabel {
	value: number;
	text: string;
	control: string;
}

const data: ImageLabel[] = [
	{value: 1, text: 'happy', control: 'happy'},
	{value: 0, text: 'neutral', control: 'neutral'},
	{value: 2, text: 'sad', control: 'sad'},
];

export class SmileyRating implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _value: number | undefined;
	private _notifyOutputChanged: () => void;
	private _context: ComponentFramework.Context<IInputs>;
	
	constructor() { }

	private refreshDisplay() {
		for (var i in data) {
			const current = data[i];
			const ctrlId = current.control + 'Ctrl';

			const isSelected = this._value === current.value;
			const imageName = current.control + '-' + 
				(isSelected ? 'selected' : 'unselect') + '';

			const element = <HTMLImageElement>document.getElementById(ctrlId);
			if(!element) continue;

			element.src = this.getImgSrc(imageName);
		}
	}

	private selectionChange(type: string) {
		const result = type === 'happy' ? 1 : (type === 'sad' ? 2 : 0);

		this._value = this._value === result ? undefined : result;
		this.refreshDisplay();
		this._notifyOutputChanged();
	}

	private getImgSrc(fileName: string): string {
		return 'https://insurgodev.crm5.dynamics.com//WebResources/ins_' + fileName;
	}

	private generateControl(container: HTMLDivElement, imageLbl: ImageLabel) {
		const imageControl = document.createElement('img');
		imageControl.id = imageLbl.control + 'Ctrl';
		imageControl.src = this.getImgSrc(imageLbl.control + '-unselect');
		imageControl.className = 'img';

		const linkControl = document.createElement('a');
		linkControl.setAttribute('href', '#');
		linkControl.addEventListener('click', 
			this.selectionChange.bind(this, imageLbl.text));
		linkControl.appendChild(imageControl);

		container.appendChild(linkControl);
	}
	

	public init(context: ComponentFramework.Context<IInputs>,
		notifyOutputChanged: () => void,
		state: ComponentFramework.Dictionary,
		container:HTMLDivElement)
	{
		this._context = context;
		this._value = context.parameters.value.raw != null ? 
			context.parameters.value.raw : undefined;
		this._notifyOutputChanged = notifyOutputChanged;
		const div = document.createElement('div');
		for	(var i in data){
			this.generateControl(div, data[i]);
		}
		container.appendChild(div);
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._context = context;
		this._value = context.parameters.value.raw != null ? 
			context.parameters.value.raw : undefined;
		this.refreshDisplay();
	}

	public getOutputs(): IOutputs
	{
		return { 
			value: this._value
		};
	}

	public destroy(): void { }
}