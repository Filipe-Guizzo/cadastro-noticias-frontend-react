export interface ButtonProps{
    label: string
    type: 'button' | 'submit'
    hidden: boolean
    onClick: ()=> void
}