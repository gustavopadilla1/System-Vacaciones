import React, { Component, useEffect } from 'react';
import jsPDF from 'jspdf';

class Pdf extends Component {
    pdfGenerate=()=>{
        var doc = new jsPDF('p', 'px', 'a4', 'false');

    doc.setFont("helvetica", "bold");
                doc.text("Solicitud de Vacaciones", 210, 40, null, null, "center");

    doc.setFont("courier", "bolditalic");
    doc.text("Vargas Fajardo Najera y Asociados SC", 210, 55, null, null, "center");


    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text("Fecha:", 30, 93); 
    doc.text("Nombre:", 30, 106); 
    doc.text("Puesto:", 30, 119); 

    doc.text("Por el medio de la presente solicito me sea autorizado _________ dias(s) a cuenta ", 30, 150); 
    doc.text("de mis vacaciones correspondiente al periodo ______________ ", 30, 160);

    doc.text("Para ser gozadas apartir del dia  _________ ", 30, 190); 
    doc.text("Reintegrerme a mis funciones el dia  ______________ ", 30, 200);


    doc.setLineWidth(0.5);
    doc.line(120, 270, 30, 270);
    doc.text("Empleado", 60, 280); 
    doc.text("Firma y nombre  ", 50, 290); 


    doc.setLineWidth(0.5);
    doc.line(150, 270, 270, 270 ); //el [1,2,3,4] el 2 y 4 son los espacios 
    doc.text("Jefe Directo", 185, 280); 
    doc.text("Nombre y Firma Jefe directo", 150, 290); 

    doc.setLineWidth(0.5);
    doc.line(300, 270, 400, 270 ); //el [1,2,3,4] el 2 y 4 son los espacios, 1 y 3 de donde empieza hasta donde termina la linea 
    doc.text("RH", 300, 280); 
    doc.text("Nombre y Firma", 300, 290); 

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