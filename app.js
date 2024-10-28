const scaleNames = {
    c:'Celsius',
    f: 'Farenheit'
}
class Converter extends React.Component {
    constructor(props){
        super(props)
       this.state = {
            tempCelsius : 0.0,
            tempFarenheit: 0.0
       }
       this.handleChange = this.handleChange.bind(this)
    }

  
    handleChange(e){
       if(e.target.name === "Celsius"){
            this.setState({
                tempCelsius: e.target.value,
                tempFarenheit: ToFarenheit(e.target.value)
            })
       }else if(e.target.name === "Farenheit"){
            this.setState({
                tempCelsius: ToCelsius(e.target.value),
                tempFarenheit: e.target.value
            })
       }
    }

    render(){
        return <div>
                   <Column left={<TemperatureInput scale="c" temperature={this.state.tempCelsius} onChange={this.handleChange} />} 
                        right = {<TemperatureInput scale="f" temperature={this.state.tempFarenheit} onChange={this.handleChange} />} />
                    <BoilingVerdict celcius={this.state.tempCelsius}/>
                </div>
    }
}


class  TemperatureInput extends React.Component{
    constructor(props){
        super(props)  
    }
    render(){
        return <div className="form-group">
                    <label htmlFor={scaleNames[this.props.scale]}>Temperature en {scaleNames[this.props.scale]}</label>
                    <input type="text" name={scaleNames[this.props.scale]} value={this.props.temperature} onChange={this.props.onChange} className="form-control"/>
                </div>
    }
}

function BoilingVerdict({celcius}){
   if(celcius>=100){
    return <div className="alert alert-success">l'eau boue</div>
   }else{
    return <div className="alert alert-info">l'eau ne boue pas</div>
   }
}

function Column({left,right}){
    return (
        <div className="row">
            <div className="col-md-6">{left}</div> 
            <div className="col-md-6">{right}</div> 
        </div>
        )
}
function ToFarenheit(celsius=0){
    return (celsius * 9/5) + 32
}

function ToCelsius(farenheit=0){
    return (farenheit -32)*5/9
}


ReactDOM.render(<Converter />, document.querySelector("#app"))