import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class ImageUploader implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _fileUploaderElement: HTMLInputElement;
	private _buttonUploadElement: HTMLElement;
	private _imageElement: HTMLElement;

	private _content: string | undefined;
	private _notifyOutputChanged: () => void;
	private _container: HTMLDivElement;

	private _submitClick: EventListenerOrEventListenerObject; 

	constructor() { }

	public init(context: ComponentFramework.Context<IInputs>,
		notifyOutputChanged: () => void,
		state: ComponentFramework.Dictionary,
		container:HTMLDivElement)
	{
		this._container = container;
		this._notifyOutputChanged = notifyOutputChanged;

		this.createComponent(context);
	}

	private refreshImage(): void {
		this._imageElement.setAttribute('src', this._content || '');
		this._imageElement.removeAttribute('style');

		this._imageElement.setAttribute('style', 'max-width: 400px;');
		if(!this._content) {
			this._imageElement.setAttribute('style', 'display:none');
		}

		this._fileUploaderElement.setAttribute('value', '');
		this._fileUploaderElement.files = null;
	}

	private onSubmit(): void {
		const files = this._fileUploaderElement.files;
		const valid = files!.length > 0;
		if(!valid) {
			alert('File not found!');
			return;
		}
		const file = files![0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		
		const $this = this;
		reader.onload = function() {
			$this._content = <string>reader.result;
		};

		reader.onerror = function() {
			alert('Error occured!');
		}

		this.refreshImage();
		this._notifyOutputChanged();
	}

	private createComponent(context: ComponentFramework.Context<IInputs>) {
		this._fileUploaderElement = document.createElement('input');
		this._fileUploaderElement.setAttribute('type', 'file');
		this._fileUploaderElement.setAttribute('class', 'image-uploader');
		this._fileUploaderElement.setAttribute('accept', 'image/*');

		this._submitClick = this.onSubmit.bind(this);

		this._buttonUploadElement = document.createElement('input');
		this._buttonUploadElement.setAttribute('type', 'button');
		this._buttonUploadElement.setAttribute('value', 'Save');
		this._buttonUploadElement.addEventListener('click', this._submitClick);

		this._content = context.parameters.imageBase64String.raw || undefined;

		this._imageElement = document.createElement('img');

		this._container.appendChild(this._fileUploaderElement);
		this._container.appendChild(this._buttonUploadElement);
		this._container.appendChild(document.createElement('br'));
		this._container.appendChild(this._imageElement);

		this.refreshImage();
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		const value = context.parameters.imageBase64String.raw;
		this._content = value != null ? value : undefined;

		this.refreshImage();
	}

	public getOutputs(): IOutputs
	{
		return {
			imageBase64String: this._content
		};
	}
	public destroy(): void { }
}