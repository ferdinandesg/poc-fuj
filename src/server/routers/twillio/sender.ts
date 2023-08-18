import { Twilio } from 'twilio'

const client = new Twilio("AC9a4c0a9a02687fc7268278ac917f5763", "c8b0cf3394f8d39bc9ff35c6864d5b12")


export async function sendConfirmationSMS(code: string) {
    try {
        const response = await client.messages.create({
            from: "+18156058261",
            to: "+5511951575318",
            body: `Seu código de confirmação é ${code}.`
        })
        return response
    } catch (error) {
        console.log(error);

    }

}