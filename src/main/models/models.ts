export type UserModel= {name:string,email:string,password:string}
export type BasicObject={[key:string]:string|boolean|number}
export type ResumeModel={headers:{[key:string]:HeaderModel},sections:SectionModel[]}
export type HeaderModel={name:string,headerContent:string}
export type SectionModel={name:string,headerContent:string,sectionContent:string}