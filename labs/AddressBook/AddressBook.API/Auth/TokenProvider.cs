using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace AddressBook.API.Auth;

public class TokenProvider
{
    public string Create(string userEmail)
    {
        var clientSecret = "randomly-generated-client-secret";

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(clientSecret));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([
                new Claim(JwtRegisteredClaimNames.Sub, userEmail),
              ]),
            Expires = DateTime.UtcNow.AddMinutes(60),
            SigningCredentials = credentials,
            Issuer = "localhost:5000",
            Audience = "localhost:5000"
        };
        var handler = new JsonWebTokenHandler();
        string token = handler.CreateToken(tokenDescriptor);
        return token;
    }
}
