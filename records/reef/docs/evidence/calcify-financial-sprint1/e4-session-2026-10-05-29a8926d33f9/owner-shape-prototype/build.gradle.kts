plugins { kotlin("jvm") version "2.4.20"; application }
repositories { mavenCentral() }
dependencies { implementation(fileTree("../../../services/platform-runtime/build/resolver-probe-deps") { include("*.jar") }) }
java { toolchain { languageVersion.set(JavaLanguageVersion.of(21)) } }
kotlin { jvmToolchain(21) }
application { mainClass.set("com.reef.platform.calcify.financial.PrototypeChecksKt"); applicationDefaultJvmArgs = listOf("-Xms64m", "-Xmx512m") }
