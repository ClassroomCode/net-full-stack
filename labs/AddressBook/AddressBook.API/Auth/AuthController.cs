using Microsoft.AspNetCore.Mvc;

namespace AddressBook.API.Auth;

[ApiController]
public class AuthController(TokenProvider tokenProvider) : ControllerBase
{
    public class LoginPayload
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }

    [HttpPost("auth/login")]
    public ActionResult<string> Login(LoginPayload user)
    {
        // TODO: validate the user information against a back-end datastore
        if (user.Email is null || user.Password != "abc123") return Unauthorized();
        var token = tokenProvider.Create(user.Email);
        return Ok(token);
    }
}
