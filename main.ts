import * as imagemin from 'imagemin';
import * as imageminWebp from 'imagemin-webp';
import { ArgumentParser } from 'argparse';
import * as shell from 'shelljs';

const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Minify images'
});
parser.addArgument(
    ['-d', '--dir'],
    {
        help: 'Directory to read big images, write small images and erase big images',
        required: true,
    }
);

const args = parser.parseArgs();

shell.cd(__dirname);
shell.cd(args.dir);
const pathDir = shell.pwd().stdout as string;
 
imagemin([pathDir+'/*.{jpg,png}'], pathDir, {
    use: [
        imageminWebp({quality: 50})
    ]
}).then(() => {
    console.log('Images optimized');
    shell.rm('-r', pathDir+'/*.{jpg,png}');
});