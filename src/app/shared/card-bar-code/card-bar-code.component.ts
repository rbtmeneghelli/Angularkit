import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Quagga from 'quagga'; // ES6

@Component({
    selector: 'app-card-barcode',
    templateUrl: './card-barcode.component.html',
    styleUrls: ['./card-barcode.component.scss']
})
export class CardBarCodeComponent implements OnInit {

    public scannerCode: string;
    public field: string;

    constructor(
        public dialogRef: MatDialogRef<CardBarCodeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    async ngOnInit(): Promise<void> {
        this.field = this.data?.field;
        await this.startScan();
    }

    async closeModal(): Promise<void> {
        this.dialogRef.close(this.scannerCode);
    }

    startScanner(): void {
        Quagga.init({
            inputStream: {
                type: "LiveStream",
                constraints: {
                    width: { min: 640 },
                    height: { min: 480 },
                    aspectRatio: { min: 1, max: 100 },
                    facingMode: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            frequency: 10,
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "code_39_reader",
                    "code_39_vin_reader",
                    "codabar_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "i2of5_reader"
                ],
                debug: {
                    showCanvas: true,
                    showPatches: true,
                    showFoundPatches: true,
                    showSkeleton: true,
                    showLabels: true,
                    showPatchLabels: true,
                    showRemainingPatchLabels: true,
                    boxFromPatches: {
                        showTransformed: true,
                        showTransformedBox: true,
                        showBB: true
                    }
                }
            },
            locate: true,
        }, function (err) {
            if (err) {
                return
            }
            Quagga.start();
        });

        Quagga.onProcessed(function (result) {
            var drawingCtx = Quagga.canvas.ctx.overlay;
            var drawingCanvas = Quagga.canvas.dom.overlay;
            drawingCanvas.style.position = 'absolute';
            drawingCanvas.style.left = '0';
            drawingCanvas.style.top = '0';
            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
                }
            }
        });

        Quagga.onDetected(async (res) => {
            await this.onBarcodeScanned(res.codeResult.code);
        });
    }

    private async onBarcodeScanned(code: string): Promise<void> {
        if (code === this.scannerCode) {
            return;
        } else {
            this.scannerCode = code;
            await this.stopScan();
        }
    }

    private async startScan(): Promise<void> {
        this.startScanner();
    }

    private async stopScan(): Promise<void> {
        Quagga.stop();
        await this.closeModal();
    }

    /* No componente que irá utilizar esse componente para leitura de codigo de barra
    /* Adicionar o codigo abaixo para que funcione da forma esperada... */

    // public async openDialog(typeField: string): Promise<void> {
    //     const dialogRef = this.dialog.open(CardBarCodeComponent, {
    //         width: '670px',
    //         height: '700px',
    //         data: {
    //             field: typeField,
    //         },
    //     });
    //     dialogRef.afterClosed().subscribe(async data => {
    //         await this.resultAfterBarCode(typeField, data);
    //     });
    // }

    // private async resultAfterBarCode(field: string, barCode: string) {
    //     switch (field) {
    //         case 'Cerar':
    //             this.formulario.get('cd_cerar').setValue(barCode);
    //             break;
    //         case 'LoteRw':
    //             this.formulario.get('cd_lote_rw').setValue(barCode);
    //             break;
    //     }
    // }
}
