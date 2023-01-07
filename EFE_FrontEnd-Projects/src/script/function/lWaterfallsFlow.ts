export default class yunyize_waterfallsFlow {
    private onDebounce: NodeJS.Timeout | null = null;

    constructor() {
    }

    public waterFall(items: Array<HTMLElement>, itemWidth: number, gap: number, father?: HTMLElement) {
        let viewWidth: number = father ? this.getClientInformation(father).width : this.getClientInformation().width;
        let boxRow: number = Math.floor(viewWidth / (itemWidth + gap));
        let minHeightBoxArray: Array<number> = [];

        if (this.onDebounce !== null) {
            clearTimeout(this.onDebounce);
        }

        this.onDebounce = setTimeout(() => {
            for (let i = 0; i < items.length; i++) {
                if (i < boxRow) {
                    items[i].style.top = '0px';
                    items[i].style.left = (itemWidth + gap) * i + 'px';

                    minHeightBoxArray.push(items[i].offsetHeight);
                } else {
                    let minHeightBox: number = minHeightBoxArray[0];
                    let minHeightBoxIndex: number = 0;

                    for (let j = 0; j < minHeightBoxArray.length; j++) {
                        if (minHeightBox > minHeightBoxArray[j]) {
                            minHeightBox = minHeightBoxArray[j];
                            minHeightBoxIndex = j;
                        }
                    }
                    items[i].style.top = minHeightBox + gap + 'px';
                    // items[i].style.left = items[minHeightBoxIndex].offsetLeft + 'px';
                    items[i].style.left = items[minHeightBoxIndex].style.left;

                    minHeightBoxArray[minHeightBoxIndex] += (items[i].offsetHeight + gap)
                }
            }
            if (father) {
                father.style.height = this.__MAX__(minHeightBoxArray) + gap + 'px';
            }
        }, 100)
    }

    private getClientInformation(element?: HTMLElement): ClientInformation {
        if (element) {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            }
        }
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        };
    }

    private __MAX__(numberArray: Array<number>): number {
        let maxNumber = 0;

        numberArray = this.__insertionSort__(numberArray);

        for (let i = 0; i < numberArray.length; i++) {
            if (numberArray[i] > maxNumber) {
                maxNumber = numberArray[i]
            }
        }

        return maxNumber;
    }

    private __insertionSort__(arr: Array<number>): Array<number> {
        let len = arr.length;
        let preIndex, current;
        for (let i = 1; i < len; i++) {
            preIndex = i - 1;
            current = arr[i];
            while (preIndex >= 0 && arr[preIndex] > current) {
                arr[preIndex + 1] = arr[preIndex];
                preIndex--;
            }
            arr[preIndex + 1] = current;
        }
        return arr;
    }
}