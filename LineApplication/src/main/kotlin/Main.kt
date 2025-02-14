import androidx.compose.desktop.ui.tooling.preview.Preview
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application

@Composable
@Preview
fun app() {
	TopAppBar(title = { Text("Manage Tables") })
}

fun main() = application {
	Window(onCloseRequest = ::exitApplication) {
		MaterialTheme {
			app()
		}
	}
}
