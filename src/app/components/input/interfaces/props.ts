export interface InputProps{
    id: string
    name: string
    placeholder: string
    type: string
    hidden: boolean
    value: any
    onChange: (e:any)=>void
}