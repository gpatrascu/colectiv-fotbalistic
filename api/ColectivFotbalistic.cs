using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api;

public record Player(string Id, string Name);

public class ColectivFotbalistic(ILogger<ColectivFotbalistic> logger)
{
    [Function("ColectivFotbalistic")]
    public IActionResult Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "group/{groupId}/players")] HttpRequest req,
        string groupId)
    {
        logger.LogInformation($"Request for group {groupId} players.");

        // Return a list of Player records
        var players = new List<Player>
        {
            new Player("1", "Lionel Messi"),
            new Player("2", "Cristiano Ronaldo"),
            new Player("3", "Kylian Mbappé"),
            new Player("4", "Neymar Jr."),
            new Player("5", "Kevin De Bruyne")
        };

        var response = new ObjectResult(new { groupId, players });

        req.HttpContext.Response.Headers.Append("Access-Control-Allow-Origin", "*");
        req.HttpContext.Response.Headers.Append("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        req.HttpContext.Response.Headers.Append("Access-Control-Allow-Headers", "Content-Type");

        return response;
    }
}
