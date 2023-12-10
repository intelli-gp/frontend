function DateInput(): JSX.Element {
    // const [inputValue, setInputValue] = useState('');

    // const handleChange = (value: string): void => {
    //     setInputValue(value);
    // };

    return (
        <div className="relative mb-3">
            <div className="relative">
                <input
                    type="date"
                    className="peer bg-white-100 border border-gray-300 text-gray-500 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
                    placeholder="Select date"
                    id="dateInput"
                />

                <label
                    htmlFor="dateInput"
                    className="absolute left-2  top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0rem]  leading-[2] text-txt transition-all duration-200 ease-out opacity-0 pointer-events-none peer-focus:opacity-100 peer-focus:-translate-y-[1.6rem] peer-focus:-translate-x-[0.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                >
                    Select a date
                </label>
            </div>
        </div>
    );
}

export default DateInput;
