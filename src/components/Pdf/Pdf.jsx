import React, { Component } from 'react';
import jsPDF from 'jspdf';

class Pdf extends Component {
    pdfGenerate=()=>{
        var doc = new jsPDF('landscape', 'px', 'a4', 'false');

        doc.save('Solicitud de Vacaciones.pdf')
    }
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <button onClick={this.pdfGenerate}>Descargar </button>
            </div>
        );
    }
}

export default Pdf;