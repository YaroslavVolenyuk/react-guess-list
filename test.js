export default function App() {
  const [inputdata, setInputdata] = useState([
    {
      firstname: '',
      secondname: '',
    },
  ]);
  const [inputArray, setInputArray] = useState([]);

  function changehandle(event) {
    setInputdata({ ...inputdata, [event.target.name]: event.target.value });
  }
  const { firstname, secondname } = inputdata;
  function changehandle2() {
    setInputArray([...inputArray, { firstname, secondname }]);
    console.log(inputArray);
  }
  // setInputdata({ firstname: '', secondname: '' });
