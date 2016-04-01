var lang_map = {
    es : {
        'Continue' : 'Continuar',
        'Clear' : 'Borrar',
        'Correct' : 'Correcto',
        'correct' : 'correcto',
        'Incorrect' : 'Incorrecto',
        'incorrect' : 'incorrecto',
        'Instructions' : 'Instrucciones',
        'False' : 'Falso',
        'false' : 'falso',
        'Got it' : 'Lo tengo',
        'Participant ID' : 'Identificación del Participante',  //Verify
        'Start' : 'Iniciar',
        'True' : 'Verdadero',
        'true' : 'verdadero',
        'Validation Code' : 'Código de validación',
        'Worker Identifier' : 'Identificador del trabajador',


        //You recalled {lc} out of {ll} letters correctly.
        'ls0' : 'Usted aserto {1} de {2} letras correctamente.',

        //You answered {mc} out of {ml} math questions correctly.
        'eq0' : 'Usted respondió {1} de {2} preguntas de matemáticas correctamente.',

        //Please try to solve each math problem correctly, as quickly as you can.
        'eq1' : 'Por favor intente de resolver cada problema de matemática correctamente, y lo más pronto posible.',

        //Please recall the order of the blue boxes (squares)
        'sq0' : 'Por favor recuerde el orden de los cuadros azules',

        //You recalled {this.getCorrectCount()} out of {this.props.sequence.length} squares correctly.
        'sq1' : 'Usted ha recordado {1} de {2} cuadros correctamente.',

        //You answered {mc} out of {ml} symmetry figure questions correctly.
        'sy0' : 'Usted ha respondido {1} de {2} respuestas de figuras simétricas correctamente.',
        
        //'Please try to identify each symmetric and asymmetric figure correctly, as quickly as you can.'
        'sy1' : 'Por favor intente identificar cada figura simétrica y asimétrica correctamente, y los más pronto posible.',

        //Your answer is {SY.isSymmetric(this.props.colored) == this.props.res ? 'correct' : 'incorrect'}.
        'c0' : 'Su respuesta es correcta.',
        'c1' : 'Su respuesta es incorrecta.', 
        'Your answer is' : 'Su respuesta es',

        //You have completed the task. Please wait while we are submitting your responses.
        's0' : 'Usted ha completado la tarea.  Por favor espere mientras enviamos sus respuestas.',

        //Your responses have been submitted
        's1' : 'Sus respuestas han sido enviadas.',

        //Your responses have been submitted with confirmation code asfda-1111-688
        's2' : 'Sus respuestas han sido enviadas. Su número de confirmación es {1}.',

        //There was an error submitting your responses. Please contact the coordinator of this experiment.
        's3' : 'Hubo un error al enviar sus respuestas.  Por favor contacta al coordinador de este experimento.',

        //You may now close this survey. Thank you.
        's4' : 'Ya puede cerrar su examen.  Gracias.'
    },
    en: {
        //You recalled {lc} out of {ll} letters correctly.
        'ls0' : 'You recalled {1} out of {2} letters correctly.',

        //You answered {mc} out of {ml} math questions correctly.
        'eq0' : 'You answered {1} out of {2} math questions correctly.',

        //Please try to solve each math problem correctly, as quickly as you can.
        'eq1' : 'Please try to solve each math problem correctly, as quickly as you can.',

        //Please recall the order of the blue boxes
        'sq0' : 'Please recall the order of the blue boxes',

        //You recalled {this.getCorrectCount()} out of {this.props.sequence.length} squares correctly.
        'sq1' : 'You recalled {1} out of {2} squares correctly.',

        //You answered {mc} out of {ml} symmetry figure questions correctly.
        'sy0' : 'You answered {1} out of {2} symmetry figure questions correctly.',
        
        //'Please try to identify each symmetric and asymmetric figure correctly, as quickly as you can.'
        'sy1' : 'Please try to identify each symmetric and asymmetric figure correctly, as quickly as you can.',

        //Your answer is {SY.isSymmetric(this.props.colored) == this.props.res ? 'correct' : 'incorrect'}.
        'c0' : 'Your answer is correct.',
        'c1' : 'Your answer is incorrect.', 

        //You have completed the task. Please wait while we are submitting your responses.
        's0' : 'You have completed the task. Please wait while we are submitting your responses.',

        //Your responses have been submitted
        's1' : 'Your responses have been submitted.',

        //Your responses have been submitted with confirmation code asfda-1111-688
        's2' : 'Your responses have been submitted with confirmation code {1}.',

        //There was an error submitting your responses. Please contact the coordinator of this experiment.
        's3' : 'There was an error submitting your responses. Please contact the coordinator of this experiment.',

        //You may now close this survey. Thank you.
        's4' : 'You may now close this survey. Thank you.'
    }
};

/**
 * Returns a text in a specific locale or language.
 * If the locale is not found, return the original text (English).
 */
function _(text, locale) {
    if(locale === undefined)
        locale = lang;

    console.log('Begin _()');
    console.log(locale);

    if(!(locale in lang_map)) {
        if('en' in lang_map)
            locale = 'en';
        else
            return text;
    }

    var loc = lang_map[locale];
    
    if(!(text in loc))
        return text;
    return loc[text];
}