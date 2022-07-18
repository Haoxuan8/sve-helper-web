import {floor, forEach} from "lodash";
import {Card} from "@/typing/Card";
import {getCardImageUrl} from "@/component/card/CardCover";
import {jsPDF} from "jspdf";

const PER_ROW = 3, ROWS = 3;
const PER_PAGE = PER_ROW * ROWS;
const A4_W = 2480, A4_H = 3508;
const CARD_W = 744, CARD_H = 1040;
const INIT_X = floor((A4_W - PER_ROW * CARD_W) / 2),
    INIT_Y = floor((A4_H - ROWS * CARD_H) / 2);

export const renderCanvas = async (cards: Card[]): Promise<HTMLCanvasElement[]> => {
    const canvasArr: HTMLCanvasElement[] = [];

    const createCanvas = async (card: Card, index: number): Promise<void> => {
        return new Promise((resolve) => {
            const page = floor(index / PER_PAGE);

            let currCanvas = canvasArr[page];
            let ctx = currCanvas?.getContext("2d");
            if (currCanvas == null) {
                currCanvas = document.createElement("canvas");
                currCanvas.width = A4_W;
                currCanvas.height = A4_H;
                ctx = currCanvas.getContext("2d");
                if (ctx) {
                    ctx.fillStyle = "#FFF";
                    ctx.fillRect(0, 0, A4_W, A4_H);
                }
                canvasArr[page] = currCanvas;
            }
            if (ctx) {


                const that = ctx;
                const image = new Image();
                image.width = CARD_W;
                image.height = CARD_H;
                const x = (index % PER_PAGE) % PER_ROW,
                    y = floor((index % PER_PAGE) / PER_ROW);
                image.crossOrigin = "Anonymous";
                image.onload = () => {
                    that.drawImage(image, INIT_X + x * (CARD_W + 1), INIT_Y + y * (CARD_H + 1), CARD_W, CARD_H);
                    resolve();
                }
                image.src = getCardImageUrl(card, true);
            }
        })
    }

    await Promise.all(cards.map(createCanvas));

    return canvasArr;
}

export const getPDF = async (cards: Card[]) => {
    const canvas = await renderCanvas(cards);
    const pdf = new jsPDF("p", "pt", "a4", true);
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    forEach(canvas, (it, index) => {
        const imgData = it.toDataURL();
        if (index > 0) {
            pdf.addPage("a4");
        }
        pdf.setPage(index + 1);
        pdf.addImage(imgData, "PNG", 0, 0, width, height, `page-${index}`, "FAST");
    });
    return pdf;
}
