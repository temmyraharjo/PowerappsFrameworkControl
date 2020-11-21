import { IInputs } from './generated/ManifestTypes';

export const controls = Object.freeze({
  div: 'file-div',
  file: 'file-fileupload',
  label: 'file-label',
  button: 'file-button-upload',
  information: 'file-information-label',
});

export class fileUpload {
  constructor(
    private context: ComponentFramework.Context<IInputs>,
    private htmlDivElement: HTMLDivElement,
    private successFn: (baseString: string | ArrayBuffer) => void) { }

  generate() {
    const maindiv = document.createElement('div') as HTMLDivElement;
    maindiv.setAttribute('class', 'mb-3');
    maindiv.setAttribute('id', controls.div);

    maindiv.appendChild(this.getLabel());
    maindiv.appendChild(this.getFileUpload());
    maindiv.appendChild(this.getButton());
    maindiv.appendChild(this.getInformation());

    this.htmlDivElement.appendChild(maindiv);
  }

  private getInformation(): HTMLLabelElement {
    const label = document.createElement('label');
    label.setAttribute('class', 'alert alert-danger');
    label.setAttribute('id', controls.information);
    label.style.display = 'none';
    label.innerHTML = 'Image is required';

    return label;
  }

  private getButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.setAttribute('class', 'form-control');
    button.innerText = 'Upload';
    button.setAttribute('id', controls.button);
    button.onclick = () => this.submit();

    return button;
  }

  private getLabel(): HTMLLabelElement {
    const label = document.createElement('label');
    label.setAttribute('class', 'form-label');
    label.innerText = 'Upload Image';
    label.setAttribute('id', controls.label);

    return label;
  }

  private getFileUpload(): HTMLInputElement {
    const fileUpload = document.createElement('input');
    fileUpload.setAttribute('id', controls.file);
    fileUpload.setAttribute('type', 'file');
    fileUpload.setAttribute('accept', 'image/*');
    fileUpload.setAttribute('class', 'form-control image-uploader');

    return fileUpload;
  }

  submit(): void {
    const imageFile = document.getElementById(
      controls.file
    ) as HTMLInputElement;
    const information = document.getElementById(controls.information);
    if (!information) return;

    const filePath = imageFile.value;
    information.style.display = !filePath ? 'block' : 'none';

    if (!filePath) {
      return;
    }

    const file = imageFile.files![0]; 
    this.convertToBase64(file as Blob).then(success => this.successFn(success));
  }

  convertToBase64(file: Blob): Promise<string | ArrayBuffer> {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.readAsDataURL(file);
    });
  }
}
