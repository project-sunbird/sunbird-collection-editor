package build
node() {
    try {
        String ANSI_GREEN = "\u001B[32m"
        String ANSI_NORMAL = "\u001B[0m"
        String ANSI_BOLD = "\u001B[1m"
        String ANSI_RED = "\u001B[31m"
        String ANSI_YELLOW = "\u001B[33m"

        ansiColor('xterm') {
            stage('Checkout') {
                cleanWs()
                sh "git clone https://github.com/project-sunbird/sunbird-content-plugins.git plugins"
                if (params.github_release_tag == "") {
                    checkout scm
                    commit_hash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    branch_name = sh(script: 'git name-rev --name-only HEAD | rev | cut -d "/" -f1| rev', returnStdout: true).trim()
                    build_tag = branch_name + "_" + commit_hash
                    println(ANSI_BOLD + ANSI_YELLOW + "github_release_tag not specified, using the latest commit hash: " + commit_hash + ANSI_NORMAL)
                    sh "cd plugins && git checkout origin/${branch_name} -b ${branch_name}"
                } else {
                    def scmVars = checkout scm
                    checkout scm: [$class: 'GitSCM', branches: [[name: "refs/tags/${params.github_release_tag}"]], userRemoteConfigs: [[url: scmVars.GIT_URL]]]
                    build_tag = params.tag
                    println(ANSI_BOLD + ANSI_YELLOW + "github_release_tag specified, building from github_release_tag: " + params.github_release_tag + ANSI_NORMAL)
                    sh "cd plugins && git checkout tags/${params.github_release_tag} -b ${params.github_release_tag}"
                }
                echo "build_tag: " + build_tag

                stage('Build') {
                    sh """
                        rm -rf collection-editor
                        node -v
                        npm -v                        
                        npm install
                        cd app
                        bower cache clean
                        bower install --force
                        cd ..
                        export version_number=${build_tag}
                        echo "Version: "$version_number
                        #gulp build
                        #gulp packageCorePlugins
                        npm run collection-plugins
                        npm run build
                        npm run test
                    """
                }
                stage('ArchiveArtifacts') {
                    archiveArtifacts "collection-editor.zip"
                    currentBuild.description = "${build_tag}"
                }
            }
        }
    }
    catch (err) {
        currentBuild.result = "FAILURE"
        throw err
    }

}
