import "./styles/index.modules.css";
import pokemonImg from "./img/img.pokemon.png";

function Login() {
  return (
    <section className="loginPage">
      <div className="loginCard">
        <div className="loginIllustration">
          <img src={pokemonImg} alt="Pokemon de boas-vindas" />
        </div>

        <div className="loginFormArea">
          <h1>Login</h1>
          <p>Use seu e-mail de treinador para continuar.</p>

          <form className="loginForm">
            <input type="email" placeholder="email" required />
            <input type="password" placeholder="senha" required />
            <button type="submit">entrar</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;