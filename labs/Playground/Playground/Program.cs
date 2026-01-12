namespace Playground
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var nums = new List<int>() { 1, 2, 3, 4, 5, 6, 7 };

            var evens = nums.Where(n => n % 2 == 0).ToArray();

            foreach (var e in evens)
            {
                Console.WriteLine(e);
            }

            nums.Add(12);
            Console.WriteLine("------------");

            foreach (var e in evens)
            {
                Console.WriteLine(e);
            }
        }
    }
}
