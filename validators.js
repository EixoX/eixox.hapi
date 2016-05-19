var Validators = {
    isCpf: function (cpf) {

        cpf = cpf.replace(/[^\d]+/g, '');

        if (cpf == '')
            return false;

        // Elimina CPFs invalidos conhecidos
        if (cpf.length != 11 || cpf == "00000000000" ||
            cpf == "11111111111" || cpf == "22222222222" ||
            cpf == "33333333333" || cpf == "44444444444" ||
            cpf == "55555555555" || cpf == "66666666666" ||
            cpf == "77777777777" || cpf == "88888888888" ||
            cpf == "99999999999")
            return false;

        // Valida 1o digito
        add = 0;
        for (i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;

        // Valida 2o digito
        add = 0;
        for (i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;

        return true;

    },
    isEmail: function (input) {
        return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(input);
    },
    validate: function (controls) {
        var isValid = true;
        for (var propertyName in controls) {
            var control = controls[propertyName];
            control.message = "";
            control.state = "NORMAL";
            control.isValid = true;
            control.value = control.interceptor ? control.interceptor(control.text) : control.text;

            /*
                First and foremost check if the control has a value.
                If it doesen't there's no point checking the rest.
            */
            if (!control.value || control.value == null || control.value.length == 0) {
                if (control.required) {
                    control.message = control.requiredMessage || "Obrigatório";
                    control.state = "ERROR";
                    control.isValid = false;
                }
                break;
            }

            //checks for a minlength
            if (control.minlength && control.minlength > 0)
                if (control.value.length < control.minlength) {
                    control.message = control.minlengthMessage || "Tamanho mínimo: " + control.minlength;
                    control.state = "ERROR";
                    control.isValid = false;
                }

            //checks for a maxlength
            if (control.maxlength && control.maxlength > 0)
                if (control.value.length > control.maxlength) {
                    control.message = control.maxlengthMessage || "Tamanho máximo: " + control.maxlength;
                    control.state = "ERROR";
                    control.isValid = false;
                }

            //checks for a pattern
            if (control.pattern && control.pattern != null && control.pattern.length > 0)
                if (!control.pattern.test(control.value)) {
                    control.message = control.patternMessage || "Formato inválido.";
                    control.state = "ERROR";
                    control.isValid = false;
                }

            //checks for a matche on other control
            if (control.match && control.match != null && control.match.length > 0)
                if (control.value != this.controls[control.match].value) {
                    control.message = control.matchMessage || "Não bate com o outro campo.";
                    control.state = "ERROR";
                    control.isValid = false;
                }


            //checks for a cpf
            if (control.cpf)
                if (!Validators.isCpf(control.value)) {
                    control.message = control.cpfMessage || "CPF inválido.";
                    control.state = "ERROR";
                    control.isValid = false;
                }

            //checks for a min value
            if (control.minvalue && control.minvalue != null)
                if (control.value < control.minvalue) {
                    control.message = control.minvalueMessage || "Valor mínimo: " + control.minvalue;
                    control.state = "ERROR";
                    control.isValid = false;
                }

            //checks for a max value
            if (control.maxvalue && control.maxvalue != null)
                if (control.value > control.maxvalue) {
                    control.message = control.maxvalueMessage || "Valor máximo: " + control.maxvalue;
                    control.state = "ERROR";
                    control.isValid = false;
                }

            //checks for an e-mail
            if (control.email)
                if (!Validators.isEmail(control.value)) {
                    control.message = control.emailMessage || "Não é um email válido.";
                    control.state = "ERROR";
                    control.isValid = false;
                }

            isValid &= control.isValid;
        }
        return isValid;
    }
};
module.exports = Validators;

