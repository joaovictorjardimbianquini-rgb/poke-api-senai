import { RiLockPasswordLine } from 'react-icons/ri'
import './styles/styles.modules.css'
import { FaUserLarge } from 'react-icons/fa6'
function Login(){
    return (
        <>
        <div className="estrelas"></div>
        <div className="formulario">
            <h1>Login</h1>
            <form>
                <div className="caixa-formulario">
                    <input type="text" placeholder="Nome de usuário" required />
                    <FaUserLarge size={30}/>
                </div>

                <div className="caixa-formulario">
                    <input type="password" placeholder="senha" required />
                    <RiLockPasswordLine size={30}/>
                </div>

                <div className="caixa-lembrar-esqueci">
                    <label><input type="checkbox"/>lembrar </label>
                    <a href="">esqueci minha senha</a>
                </div>

                <button type="submit"className='button'>Entrar</button>

                <div className="link-registro">
                    <p>Não tem conta? <a href="">Registrar</a> </p>
                </div>

            </form>
        </div>
        </>
    )
}

export default Login