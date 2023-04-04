using System;
using System.IO;
using HtmlAgilityPack;

namespace SongsFixer
{
    public class Program
    {
        private static string songsDirectory = "../songs";
        static void Main()
        {
            var songToFix = File.ReadAllText($"{songsDirectory}/template.html");
            songToFix = songToFix.Replace("N.C.", string.Empty);
            var doc = new HtmlDocument();
            doc.LoadHtml(songToFix);
            RemoveClassAttributes(doc);
            ChangeChordColors(doc);
            FileStream sw = new FileStream($"{songsDirectory}/fixed.html", FileMode.Create);
            doc.Save(sw);
        }

        private static void ChangeChordColors(HtmlDocument html)
        {
            var elements = html.DocumentNode.SelectNodes("//span");
            if (elements != null)
            {
                foreach (var element in elements)
                {
                    if (element.Attributes.Contains("style"))
                    {
                        element.Attributes["style"].Value = element.Attributes["style"].Value.Replace("rgb(0, 0, 0)", "orangered");
                    }
                }
            }
        }

        public static void RemoveClassAttributes(HtmlDocument html)
        {
            var elements = html.DocumentNode.SelectNodes("//@class");

            if (elements != null)
            {
                foreach (var element in elements)
                {
                    element.Attributes["class"].Remove();
                }
            }
        }
    }
}
