import './styles/style.css'
//import 'boxicons/css/boxicons.min.css'
import professor from '../../assets/images/prof_carvalho.png';

function Cadastro() {
    return (
        <>
            <div className='img-professor'>
                <img src={professor} alt="professor carvalho" />
            </div>
            <div className="formulario">
                <h1>cadastrar</h1>
                <form>
                    <div className="caixa-formulario">
                        <input type="text" placeholder="nome" required />
                        <i className='bx bxs-user'></i>
                    </div>


                    <div className="caixa-formulario">
                        <input type="text" placeholder="sobrenome" required />
                        <i className='bx bxs-user'></i>
                    </div>


                    <div className="caixa-formulario">
                        <input type="password" placeholder="senha" required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>


                    <div className="caixa-formulario">
                        <input type="number" placeholder="telefone" required />
                        <i className='bx bxs-phone'></i>
                    </div>


                    <div className="caixa-formulario">
                        <input type="text" placeholder="email" required />
                        <i className='bx bxs-envelope'></i>
                    </div>


                    <div>
                        <input type="date" placeholder="data de nascimento" required />
                        <i className='bx bxs-calendar'></i>
                    </div>


                    <button type="submit">criar conta</button>
                </form>
            </div>
        </>
    )
}
export default Cadastro;