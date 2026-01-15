using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace AddressBook.API.Auth;

public class TokenProvider(IConfiguration config)
{
    public string Create(string userEmail)
    {
        var clientSecret = config["Jwt:ClientSecret"]!;

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(clientSecret));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([
                new Claim(JwtRegisteredClaimNames.Sub, userEmail),
              ]),
            Expires = DateTime.UtcNow.AddMinutes(int.Parse(config["Jwt:ExpirationInMinutes"]!)),
            SigningCredentials = credentials,
            Issuer = config["Jwt:Issuer"]!,
            Audience = config["Jwt:Audience"]!
        };
        var handler = new JsonWebTokenHandler();
        string token = handler.CreateToken(tokenDescriptor);
        return token;
    }
}
