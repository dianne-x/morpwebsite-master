using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.Wpf;
using System.IO;
using System.Windows;
using System.Windows.Input;

namespace MORP_app;
public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        _ = InitializeWebView2();
    }

    private async Task InitializeWebView2()
    {
        var webview = new WebView2();
        myPanel.Children.Add(webview);

        string userDataFolder = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "MORP_app", "WebView2");

        try
        {
            var env = await CoreWebView2Environment.CreateAsync(null, userDataFolder);
            await webview.EnsureCoreWebView2Async(env);
            webview.Source = new Uri("https://morp.teamorange.hu/login");
        }
        catch (Exception ex)
        {
            MessageBox.Show($"WebView2 Init Failed: {ex.Message}");
        }

    }

    private void MinimizeBtn_Click(object sender, RoutedEventArgs e) => 
        this.WindowState = WindowState.Minimized;

    private void MaximizeBtn_Click(object sender, RoutedEventArgs e) =>
        this.WindowState = this.WindowState == WindowState.Maximized 
            ? WindowState.Normal : WindowState.Maximized;

    private void CloseBtn_Click(object sender, RoutedEventArgs e) =>
        this.Close();

    private void Window_MouseLeftButtonDown(object sender, MouseButtonEventArgs e) =>
        DragMove();
}