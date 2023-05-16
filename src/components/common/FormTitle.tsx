interface IFormTitle {
  isRequired: boolean;
  title: string;
}

const FormTitle = ({ isRequired, title }: IFormTitle) => {
  return (
    <>
      <div className={"pb-2 font-bold "}>
        {title}
        {isRequired && <span className={"text-red-500"}>{" *"}</span>}

        {!isRequired && (
          <span className={"text-gray-500 font-light"}>{"(Optional)"}</span>
        )}

        {/*    <span className={`${isRequired ? 'text-red-500' : 'text-gray-500 font-light'}`}>*/}
        {/*    {isRequired ? ' *' : ' (Nepali)'}*/}
        {/*</span>*/}
        {/*}*/}
      </div>
    </>
  );
};

export default FormTitle;
