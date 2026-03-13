import { RiLockPasswordLine } from 'react-icons/ri'
import './styles/styles.modules.css'
import { FaUserLarge } from 'react-icons/fa6'
import fotopokemon from './img/img.pokemon.png'
function Login(){
    return (
        <>

        <div className='img-pokemon' >
            <img src={fotopokemon} alt="imagen de fundo pokemon" />
        </div>
        <div className="formulario">
            <h1>Login</h1>
            <form>
                <div className="caixa-formulario">
                    <input type="text" placeholder="Nome de usuário" required />
                    <FaUserLarge className='user' size={30}/>
                </div>

                <div className="caixa-formulario">
                    <input type="password" placeholder="senha" required />
                    <RiLockPasswordLine className='block' size={30}/>
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