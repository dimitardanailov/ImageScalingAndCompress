import HTMLElement from 'entities/DOM/HTMLElement';
import ApplicationMap from 'entities/javascript/map/ApplicationMap';

/**
 * Current implementation will create a progressbar for file uploading.
 * 
 * We need to have follow elements:
 * - progressbar container
 * - progressbar
 * 	- progressbar percent information (Optional Element)
 *  - progressbar of completion
 * - progressbar text info (Optional Element)
 */
class NgFileUploadProgressBar {

	/**
	 * @property HTMLObject ngFileUploadElement parent element
	 * @property object attrs ng-compression-file-upload attributes
	 */
	constructor(ngFileUploadElement, attrs) {
		// Pointer: how many percent of upload are completed.
		this._percentOfCompletion = 0;

		// Parent element
		this.ngFileUploadElement = ngFileUploadElement;
		
		// ng-compression-file-upload attributes
		this.attrs = attrs;

		// Contain all information for progress bar
		this._progressBarContainer = this.createProgressBarContainer();

		// Contain progress bar 
		this._progressBar = this.createProgressBar();
		this._progressBarOfCompletion = this.createProgressBarOfCompletion();
		
		// Contain information for uploading progress in percent
		this._progressBarPercentInformation = this.createProgressBarPercentInformation();

		// Information for 
		this._progressbarTextInfo = this.createProgressBarTextInfo();
	}

	/**
	 * Get information: how many percent of upload are completed.
	 */
	get percentOfCompletion() {
		return this._percentOfCompletion;
	}

	/**
	 * We need to update percent of completion.
	 */
	set percentOfCompletion(percentOfCompletion) {
		this._percentOfCompletion = percentOfCompletion;
	}
 
	/**
	 * @return HTMLObject
	 */
	get progressBarContainer() {
		return this._progressBarContainer;
	}

	/**
	 * @return mixed null or HTMLObject
	 */
	get progressBar() {
		return this._progressBar;
	}

	/**
	 * @return mixed null or HTMLObject
	 */
	get progressBarPercentInformation() {
		return this._progressBarPercentInformation;
	}

	/**
	 * @return mixed null or HTMLObject
	 */
	get progressbarTextInfo() {
		return this._progressbarTextInfo;
	}

	/**
	 * Function should to add a section element with progress bar information.
  	 * 
  	 * @see HTMLElement::createHTMLElementAppendToParrentElement
  	 *
	 * @return HTMLObject
 	 */
	createProgressBarContainer() {
		const element = HTMLElement.createHTMLElementAppendToParrentElement(
			'section',
			this.attrs,
			'ngcfuFileUploadProgressbarItemContainerClassName',
			this.ngFileUploadElement
		);

		return element;
	}

	/**
	 * Function should to create a progress bar.
	 * 
	 * Every progress bar have two parts
 	 * 	- progressbar percent information (Optional Element)
 	 *  - progressbar of completion
 	 * 
 	 * @see HTMLElement::createHTMLElementAppendToParrentElement
 	 * 
 	 * @return HTMLObject
	 */
	createProgressBar() {
		const element = HTMLElement.createHTMLElementAppendToParrentElement(
			'div',
			this.attrs,
			'ngcfuFileUploadProgressbarItemClassName',
			this.progressBarContainer
		);

		return element;
	}

	/**
	 * 
	 */
	createProgressBarOfCompletion() {
		console.log(this.attrs);

		const element = HTMLElement.createHTMLElementAppendToParrentElement(
			'div',
			this.attrs,
			'ngcfuFileUploadProgressbarItemCompletionBarClassName',
			this.progressBar
		);

		return element;
	}

	/**
	 *
	 */
	createProgressBarPercentInformation() {
		const element = document.createElement('span');

		// Set Class Name

		// Append item to parent
		// this.progressBarContainer.appendChild(element);
	}

	/**
	 * If ngcfuFileUploadItemTextDropAvailable and ngcfuNgfDropAvailable exists,
	 * function should to add a span element with drop available information.
	 *
	 * @return mixed null or HTMLObject
	 */
	createProgressBarTextInfo() {
		const attributeMap = ApplicationMap.generateAttributeMap(
			'ngcfuFileUploadProgressbarItemTextInfo',
			'ngcfuFileUploadProgressbarItemTextClassName',
			'ngcfuFileUploadProgressbarItemTextInfoText'
		);

		const progressBarTextInfo = HTMLElement.tryToCreateHTMLElement(
			this.attrs,
			'span',
			attributeMap
		);

		if (progressBarTextInfo !== null) {
			this.progressBarContainer.appendChild(progressBarTextInfo);
		}

		return progressBarTextInfo;
	}
}

export default NgFileUploadProgressBar;