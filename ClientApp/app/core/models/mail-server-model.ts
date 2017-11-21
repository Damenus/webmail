export interface MailServerModel{
    id: number;
    mailAddress: string;
    password: string;
    smtpServerAddress: string;
    imapServerAddress: string;
}